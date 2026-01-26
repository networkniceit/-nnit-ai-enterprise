# Contributing to NNIT AI Enterprise

Thank you for your interest in contributing to NNIT AI Enterprise! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in [Issues](https://github.com/networkniceit/-nnit-ai-enterprise/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features
1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach (optional)

### Code Contributions

#### 1. Fork and Clone
```bash
git clone https://github.com/YOUR_USERNAME/-nnit-ai-enterprise.git
cd -nnit-ai-enterprise
git remote add upstream https://github.com/networkniceit/-nnit-ai-enterprise.git
```

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

#### 3. Make Changes
- Follow the code style guidelines (see below)
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

#### 4. Test Your Changes
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Lint code
npm run lint
```

#### 5. Commit and Push
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

#### 6. Create Pull Request
1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template with:
   - Description of changes
   - Related issue number
   - Testing performed
   - Screenshots (if UI changes)

## 📝 Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Prefer `async/await` over callbacks
- Use functional programming where appropriate

### React Components
- Use functional components with hooks
- One component per file
- Use TypeScript interfaces for props
- Keep components small and focused
- Use meaningful prop names

### Backend Code
- Use async/await for database operations
- Add error handling to all endpoints
- Validate input data
- Use middleware for common operations
- Follow RESTful API conventions

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add payment integration
fix: resolve login authentication issue
docs: update API documentation
```

## 🧪 Testing Guidelines

### Backend Tests
- Write unit tests for services and utilities
- Write integration tests for API endpoints
- Aim for 80%+ code coverage
- Use meaningful test descriptions

### Frontend Tests
- Write component tests
- Test user interactions
- Test API integration
- Use React Testing Library

## 📚 Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add JSDoc comments for new functions
- Update API documentation for new endpoints

## 🔒 Security

- Never commit secrets or credentials
- Use environment variables for configuration
- Validate and sanitize all user input
- Follow OWASP security guidelines
- Report security issues privately

## 💻 Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Setup
```bash
# Install dependencies
npm run install:all

# Copy environment file
cp .env.example .env

# Start development servers
npm run dev
```

## 🎯 Pull Request Checklist

Before submitting a PR, ensure:
- [ ] Code follows style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete
- [ ] No merge conflicts

## 🌟 Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Appreciated in the community

## 📞 Getting Help

- Open an issue for questions
- Join discussions in Issues
- Check existing documentation

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to NNIT AI Enterprise! 🎉
