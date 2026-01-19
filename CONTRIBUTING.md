# Contributing to NNIT AI Enterprise

Thank you for considering contributing to NNIT AI Enterprise! This document provides guidelines for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Be open to constructive criticism
- Focus on what's best for the community
- Show empathy towards others

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**How to Submit a Good Bug Report:**
- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples
- Describe the behavior you observed and what you expected
- Include screenshots if applicable
- Include your environment details (OS, Node version, etc.)

**Template:**
```markdown
## Description
[Clear description of the bug]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., Ubuntu 22.04]
- Node.js: [e.g., v18.0.0]
- Browser: [e.g., Chrome 119]

## Screenshots
[If applicable]
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:
- Clear and descriptive title
- Detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- Include mockups or examples if possible

### Code Contributions

We love code contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
6. **Push to the branch** (`git push origin feature/AmazingFeature`)
7. **Open a Pull Request**

---

## Development Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Git
- MongoDB (optional for development)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/networkniceit/-nnit-ai-enterprise.git
   cd ./-nnit-ai-enterprise
   ```
   
   **Note**: The `./` before the directory name is required because the repository name starts with a hyphen.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open `http://localhost:3000` in your browser

### Project Structure
```
-nnit-ai-enterprise/
├── server/           # Backend code
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── middleware/  # Express middleware
│   └── utils/       # Utility functions
├── public/          # Frontend code
│   ├── css/        # Stylesheets
│   ├── js/         # JavaScript
│   └── index.html  # Main HTML
└── uploads/        # File uploads
```

---

## Coding Standards

### JavaScript Style Guide

We follow standard JavaScript conventions:

**General Rules:**
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use meaningful variable names
- Add comments for complex logic

**Example:**
```javascript
// Good
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Bad
const getUser = async (id) => {
  let u = await User.findById(id)
  return u
}
```

### CSS Style Guide

**General Rules:**
- Use meaningful class names
- Follow BEM methodology when appropriate
- Use CSS variables for colors and common values
- Keep selectors specific but not overly complex

**Example:**
```css
/* Good */
.button-primary {
  background: var(--primary-color);
  padding: 10px 20px;
  border-radius: 6px;
}

/* Bad */
.btn1 {
  background: #6366f1;
  padding: 10px 20px;
}
```

### API Design

**RESTful Conventions:**
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use plural nouns for resources (`/api/projects`, not `/api/project`)
- Use nested routes for relationships (`/api/projects/:id/proposals`)
- Return appropriate status codes
- Include error messages in responses

**Example:**
```javascript
// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Error Handling

Always handle errors appropriately:

```javascript
try {
  // Your code here
} catch (error) {
  console.error('Error description:', error);
  res.status(500).json({ error: 'User-friendly error message' });
}
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT authentication

Implement JWT-based authentication system with login and registration endpoints.

Closes #123
```

```
fix(projects): resolve filter not working

Fixed an issue where the project category filter was not applying correctly.

Fixes #456
```

### Best Practices
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep first line under 72 characters
- Reference issues and pull requests when applicable

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Run existing tests** to ensure nothing breaks
4. **Update README.md** if adding new functionality
5. **Follow the coding standards**

### PR Title

Use a clear and descriptive title:
```
feat: Add AI-powered skill recommendations
fix: Resolve login authentication bug
docs: Update deployment guide
```

### PR Description Template

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
[Describe the tests you ran]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally

## Screenshots
[If applicable]

## Related Issues
Closes #[issue number]
```

### Review Process

1. At least one maintainer review is required
2. All automated checks must pass
3. No merge conflicts
4. Documentation is updated
5. Tests are passing

### After Your PR is Merged

- Delete your feature branch
- Update your local repository
- Celebrate! 🎉

---

## Development Workflow

### Feature Development

1. **Create an issue** describing the feature
2. **Get approval** from maintainers
3. **Create a branch** from `main`
4. **Implement the feature**
5. **Write tests**
6. **Update documentation**
7. **Submit PR**

### Bug Fixes

1. **Reproduce the bug** locally
2. **Create a branch** from `main`
3. **Write a failing test** that demonstrates the bug
4. **Fix the bug**
5. **Verify the test passes**
6. **Submit PR**

---

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

Example test structure:
```javascript
describe('User Authentication', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

---

## Questions?

If you have questions:
- Check existing issues and discussions
- Create a new issue with the `question` label
- Reach out to maintainers

---

## Recognition

Contributors will be:
- Listed in the project README
- Mentioned in release notes
- Part of our growing community

Thank you for contributing to NNIT AI Enterprise! Together, we're building a platform that helps freelancers worldwide earn and support their families. 🚀
