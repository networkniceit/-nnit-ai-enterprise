# NNIT AI Enterprise - AI-Powered Freelancer Platform

🚀 **100% Free Forever** | 🤖 **AI-Powered Matching** | 🌍 **Global Community**

## Overview

NNIT AI Enterprise is a revolutionary freelancer platform that leverages artificial intelligence to connect talented freelancers with clients worldwide. Unlike traditional platforms, NNIT is completely free and uses AI to optimize every aspect of the freelancing experience.

## 🌟 Key Features

### For Freelancers
- **AI Project Matching**: Get matched with projects that perfectly fit your skills and experience
- **AI Proposal Generator**: Generate professional, customized proposals in seconds
- **Smart Bid Suggestions**: AI-powered pricing recommendations to maximize your chances
- **Skills Analysis**: Get insights on in-demand skills and personalized learning paths
- **Zero Fees**: Keep 100% of your earnings

### For Clients
- **AI-Powered Talent Matching**: Find the perfect freelancer for your project
- **Smart Project Management**: Streamlined workflow from posting to completion
- **Quality Assurance**: AI-assisted freelancer vetting and project monitoring
- **No Hidden Costs**: Post unlimited projects for free

### Platform Features
- **Secure Authentication**: JWT-based secure login system
- **Real-time Updates**: Stay informed about project status and proposals
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Beautiful, intuitive interface built with modern web technologies

## 🚀 Quick Start

> **⚠️ Important**: Because this repository name starts with a hyphen (`-nnit-ai-enterprise`), you must use `cd ./-nnit-ai-enterprise` (with `./` prefix) instead of `cd -nnit-ai-enterprise` to change into the directory after cloning.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional - platform works in demo mode without it)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
   cd ./-nnit-ai-enterprise
   ```
   
   **Note**: The `./` before the directory name is required because the repository name starts with a hyphen.

2. **Switch to the feature branch** (if the code is not yet merged to main)
   ```bash
   git checkout copilot/complete-work-for-earnings
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your settings (optional for demo mode):
   ```env
   PORT=3000
   JWT_SECRET=your-secret-key
   MONGODB_URI=mongodb://localhost:27017/nnit-ai-enterprise
   ```

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the platform**
   Open your browser and visit: `http://localhost:3000`

### Development Mode

For development with auto-reload:
```bash
npm run dev
```

### Troubleshooting

**Problem: `cd: -n: invalid option` error**

If you get this error:
```
bash: cd: -n: invalid option
cd: usage: cd [-L|[-P [-e]] [-@]] [dir]
```

**Solution**: Use `cd ./-nnit-ai-enterprise` instead of `cd -nnit-ai-enterprise`. The `./` prefix is required because the repository name starts with a hyphen, which would otherwise be interpreted as a command option.

**Problem: `package.json` not found**

If you get this error after cloning:
```
npm error enoent Could not read package.json
```

**Solution**: Make sure you've checked out the correct branch:
```bash
git checkout copilot/complete-work-for-earnings
```

The full platform code is in this branch. Once merged to main, this step won't be necessary.

## 📁 Project Structure

```
-nnit-ai-enterprise/
├── server/
│   ├── index.js              # Main server file
│   ├── models/               # Database models
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Proposal.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── projects.js
│   │   ├── proposals.js
│   │   └── ai.js
│   ├── middleware/           # Express middleware
│   │   └── auth.js
│   ├── controllers/          # Request handlers
│   └── utils/               # Utility functions
│       └── db.js
├── public/
│   ├── index.html           # Main HTML file
│   ├── css/
│   │   └── style.css        # Styles
│   └── js/
│       └── app.js           # Frontend JavaScript
├── uploads/                 # File uploads directory
├── .env.example            # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies and scripts
├── LICENSE               # MIT License
└── README.md            # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Proposals
- `POST /api/proposals` - Create a new proposal
- `GET /api/proposals/project/:projectId` - Get proposals for a project
- `GET /api/proposals/freelancer/:freelancerId` - Get freelancer's proposals
- `PUT /api/proposals/:id/status` - Update proposal status

### AI Features
- `POST /api/ai/match-projects` - AI-powered project matching
- `POST /api/ai/generate-proposal` - Generate AI proposal
- `POST /api/ai/analyze-skills` - Analyze skills and get recommendations
- `POST /api/ai/suggest-bid` - Get AI bid suggestions

## 💡 Usage

### For Freelancers

1. **Sign Up**
   - Create a free account with your email
   - Complete your profile with skills and experience

2. **Browse Projects**
   - View available projects in your category
   - Use AI matching to find perfect opportunities

3. **Submit Proposals**
   - Use AI proposal generator for professional bids
   - Get smart bid suggestions based on market rates

4. **Start Earning**
   - Get hired and complete projects
   - Build your reputation and portfolio

### For Clients

1. **Post a Project**
   - Describe your project requirements
   - Set budget and timeline

2. **Review Proposals**
   - Get AI-matched freelancer recommendations
   - Review bids and freelancer profiles

3. **Hire & Collaborate**
   - Select the best freelancer
   - Manage project progress

4. **Complete & Review**
   - Approve completed work
   - Leave feedback

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (optional)
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript** - Interactivity
- **Font Awesome** - Icons

### Security
- **Helmet** - Security headers
- **Rate Limiting** - DDoS protection
- **Input Validation** - Data sanitization

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- Secure HTTP headers with Helmet
- CORS protection

## 🌐 Demo Mode

The platform includes a demo mode that works without MongoDB. All data is stored in-memory, perfect for:
- Quick testing and evaluation
- Development without database setup
- Demonstrations and presentations

**Note**: Demo mode data is lost when the server restarts.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Solomon Omomeje Ayodele**

## 🙏 Acknowledgments

- Thanks to all contributors who help make this platform better
- Inspired by the need for a truly free freelancing platform
- Built with ❤️ to help freelancers earn and support their families

## 📞 Support

- Create an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Join our community discussions

## 🚀 Roadmap

- [ ] Real-time chat system
- [ ] Payment integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Advanced AI features with OpenAI integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Video call integration
- [ ] Advanced analytics dashboard

## 💰 Start Earning Today!

Visit [http://localhost:3000](http://localhost:3000) after starting the server and begin your journey to financial freedom!

---

**Made with ❤️ for freelancers worldwide | 100% Free Forever**
