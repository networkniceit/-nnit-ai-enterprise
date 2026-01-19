# Deployment Guide

This guide will help you deploy NNIT AI Enterprise to various hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Deployment Options](#deployment-options)
  - [Heroku](#heroku)
  - [DigitalOcean](#digitalocean)
  - [AWS](#aws)
  - [Vercel/Netlify (Frontend)](#vercel-netlify)
- [Database Setup](#database-setup)
- [Production Best Practices](#production-best-practices)

---

## Prerequisites

Before deploying, ensure you have:
- Git installed
- Node.js 16+ installed
- A hosting account (Heroku, DigitalOcean, AWS, etc.)
- MongoDB instance (MongoDB Atlas recommended)
- Domain name (optional)

---

## Environment Configuration

### Production Environment Variables

Create a `.env` file with production values:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nnit-ai-enterprise

# JWT Security
JWT_SECRET=your-super-secure-random-secret-key-min-32-chars
JWT_EXPIRE=7d

# AI Features (Optional)
OPENAI_API_KEY=sk-your-openai-api-key

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# Payment Integration (Optional)
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key

# Application
APP_URL=https://yourdomain.com
```

**Security Notes:**
- Never commit `.env` to Git
- Use strong, unique JWT_SECRET
- Rotate secrets regularly
- Use environment variable management tools

---

## Deployment Options

### Heroku

1. **Install Heroku CLI**
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create nnit-ai-enterprise
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set MONGODB_URI=your-mongodb-uri
   ```

5. **Add Procfile**
   Create `Procfile` in root:
   ```
   web: node server/index.js
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **Open App**
   ```bash
   heroku open
   ```

**Heroku-specific configurations:**
- Add MongoDB Atlas add-on or use external MongoDB
- Enable SSL (automatic with Heroku)
- Configure custom domain if needed

---

### DigitalOcean

1. **Create Droplet**
   - Choose Ubuntu 22.04 LTS
   - Select appropriate size (start with $12/month)
   - Add SSH key

2. **Connect to Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   ```

4. **Install PM2**
   ```bash
   npm install -g pm2
   ```

5. **Clone Repository**
   ```bash
   git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
   cd ./-nnit-ai-enterprise
   ```
   
   **Note**: The `./` before the directory name is required because the repository name starts with a hyphen.

6. **Install Dependencies**
   ```bash
   npm install --production
   ```

7. **Configure Environment**
   ```bash
   nano .env
   # Add your production variables
   ```

8. **Start with PM2**
   ```bash
   pm2 start server/index.js --name "nnit-ai-enterprise"
   pm2 save
   pm2 startup
   ```

9. **Setup Nginx (Reverse Proxy)**
   ```bash
   apt-get install -y nginx
   ```

   Create Nginx config:
   ```bash
   nano /etc/nginx/sites-available/nnit-ai-enterprise
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/nnit-ai-enterprise /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

10. **Setup SSL with Let's Encrypt**
    ```bash
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d yourdomain.com
    ```

---

### AWS (Elastic Beanstalk)

1. **Install AWS CLI and EB CLI**
   ```bash
   pip install awsebcli --upgrade
   ```

2. **Initialize EB**
   ```bash
   eb init -p node.js nnit-ai-enterprise
   ```

3. **Create Environment**
   ```bash
   eb create production-env
   ```

4. **Set Environment Variables**
   ```bash
   eb setenv NODE_ENV=production JWT_SECRET=your-secret MONGODB_URI=your-uri
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

6. **Open Application**
   ```bash
   eb open
   ```

---

### Vercel/Netlify (Frontend Static Hosting)

For frontend-only deployment (requires separate API):

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Note:** You'll need to deploy the backend separately and update API URLs.

---

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free tier account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Create Database User**
   - Security → Database Access
   - Add new user with password
   - Grant read/write permissions

4. **Whitelist IP Addresses**
   - Security → Network Access
   - Add IP address (0.0.0.0/0 for all IPs in production)
   - Or add specific IPs for better security

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your actual password

6. **Update Environment Variable**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nnit-ai-enterprise
   ```

### Self-Hosted MongoDB

If running MongoDB on your own server:

```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
apt-get update
apt-get install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Set connection string
MONGODB_URI=mongodb://localhost:27017/nnit-ai-enterprise
```

---

## Production Best Practices

### Security

1. **Environment Variables**
   - Never commit secrets to Git
   - Use strong, random JWT secrets
   - Rotate credentials regularly

2. **HTTPS/SSL**
   - Always use HTTPS in production
   - Use Let's Encrypt for free SSL
   - Enable HSTS headers

3. **Rate Limiting**
   - Already configured in the app
   - Consider adding Cloudflare for DDoS protection

4. **Input Validation**
   - Already implemented
   - Keep dependencies updated

### Performance

1. **Enable Compression**
   ```bash
   npm install compression
   ```

   Add to server/index.js:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Caching**
   - Use Redis for session storage
   - Enable CDN for static assets

3. **Database Indexing**
   - Create indexes on frequently queried fields
   - Monitor query performance

### Monitoring

1. **Application Monitoring**
   - Use PM2 for process management
   - Set up error tracking (Sentry, Rollbar)
   - Monitor server resources

2. **Logging**
   ```bash
   pm2 logs nnit-ai-enterprise
   ```

3. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

### Backup

1. **Database Backups**
   - Enable automated backups in MongoDB Atlas
   - Schedule regular backups
   - Test restore procedures

2. **Code Backups**
   - Use Git for version control
   - Tag releases
   - Maintain staging environment

### Scaling

1. **Horizontal Scaling**
   - Use load balancer (Nginx, AWS ELB)
   - Run multiple instances with PM2 cluster mode
   ```bash
   pm2 start server/index.js -i max
   ```

2. **Database Scaling**
   - Use MongoDB replica sets
   - Enable sharding for large datasets
   - Implement read replicas

3. **CDN**
   - Use Cloudflare or AWS CloudFront
   - Serve static assets from CDN
   - Enable edge caching

---

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connected and accessible
- [ ] SSL certificate installed
- [ ] Custom domain configured
- [ ] Error tracking enabled
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] Performance optimized
- [ ] Documentation updated
- [ ] Team notified

---

## Troubleshooting

### Common Issues

**Application won't start:**
- Check environment variables
- Verify Node.js version
- Check port availability
- Review logs: `pm2 logs`

**Database connection fails:**
- Verify MongoDB URI
- Check network access rules
- Test connection locally
- Verify credentials

**502 Bad Gateway (Nginx):**
- Check if application is running
- Verify proxy_pass URL
- Check firewall rules
- Review Nginx error logs

**Performance issues:**
- Enable compression
- Optimize database queries
- Add caching layer
- Scale horizontally

---

## Support

For deployment issues:
- Check server logs
- Review application logs
- Test locally first
- Check documentation
- Create GitHub issue

---

**Ready to deploy? Start earning with NNIT AI Enterprise today!**
