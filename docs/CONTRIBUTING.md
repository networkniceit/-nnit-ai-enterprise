# Contributing to NNIT AI Enterprise

Thank you for your interest in contributing to NNIT AI Enterprise! This document provides guidelines for contributing to the project.

## Code of Conduct

Be respectful, inclusive, and considerate of others. We want to create a welcoming environment for all contributors.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/networkniceit/-nnit-ai-enterprise/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, Python version)
   - Screenshots if applicable

### Suggesting Features

1. Check existing feature requests in Issues
2. Create a new issue with:
   - Clear feature description
   - Use case / problem it solves
   - Proposed implementation (if you have ideas)

### Pull Requests

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/-nnit-ai-enterprise.git
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/my-new-feature
   ```
4. **Make your changes** following the coding standards
5. **Test** your changes thoroughly
6. **Commit** with clear messages:
   ```bash
   git commit -m "Add feature: clear description"
   ```
7. **Push** to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
8. **Create a Pull Request** from your fork to the main repository

### Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Include tests for new features
- Update documentation if needed
- Follow existing code style
- Ensure all tests pass
- Keep commits atomic and well-described

## Development Setup

See [INSTALLATION.md](INSTALLATION.md) for setup instructions.

## Coding Standards

### Python (Backend)

- Follow PEP 8 style guide
- Use Black for formatting:
  ```bash
  black backend/
  ```
- Use type hints where appropriate
- Write docstrings for functions and classes
- Maximum line length: 100 characters

### TypeScript/JavaScript (Frontend/Mobile)

- Follow ESLint configuration
- Use Prettier for formatting:
  ```bash
  npm run format
  ```
- Use TypeScript strict mode
- Write JSDoc comments for complex functions
- Use meaningful variable names

### Commit Messages

Follow conventional commits:

```
feat: add new text generation endpoint
fix: resolve authentication bug
docs: update installation guide
style: format code with prettier
refactor: simplify AI engine logic
test: add tests for jobs API
chore: update dependencies
```

## Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Mobile Tests

```bash
cd mobile
npm test
```

## Documentation

- Update relevant documentation for any changes
- Keep README files up to date
- Add JSDoc/docstrings for new functions
- Update API documentation for endpoint changes

## Project Structure

```
/backend       - Python FastAPI backend
/frontend      - React + Vite frontend
/mobile        - React Native Expo mobile app
/database      - Database schemas and migrations
/docs          - Documentation
/scripts       - Setup and utility scripts
/.github       - GitHub Actions workflows
```

## Areas for Contribution

### Priority Areas

1. **AI Engines**: Improve accuracy, add new models
2. **UI/UX**: Enhance design, add animations
3. **Mobile**: Add offline functionality, improve performance
4. **Tests**: Increase test coverage
5. **Documentation**: Improve guides, add examples
6. **Performance**: Optimize API responses, reduce bundle size

### Good First Issues

Look for issues labeled `good-first-issue` in the GitHub Issues.

## Review Process

1. Maintainer reviews your PR
2. Feedback is provided if changes needed
3. Once approved, PR is merged
4. Your contribution is credited in release notes

## Questions?

- Open a discussion in GitHub Discussions
- Create an issue for specific questions
- Tag @networkniceit for urgent matters

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors are recognized in:
- Release notes
- Contributors list in README
- Special thanks in documentation

## Thank You!

Every contribution, no matter how small, is valuable and appreciated. Thank you for helping make NNIT AI Enterprise better!

---

**Created by Solomon Omomeje Ayodele | Network Nice IT Tec (NNIT)**
