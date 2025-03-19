# Contributing to Carbonix

Thank you for considering a contribution to Carbonix! This document outlines the process for contributing to our project.

## Code of Conduct

By participating in this project, you agree to uphold our Code of Conduct. Please report unacceptable behavior to the project team.

## Ways to Contribute

- Reporting bugs
- Suggesting enhancements
- Writing documentation
- Submitting code changes
- Reviewing code

## Development Process

1. **Fork the Repository**: Create your own fork of the project

2. **Create a Branch**: Create a feature or bugfix branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/issue-you-are-fixing
   ```

3. **Make Changes**: Implement your changes following the coding conventions

4. **Write Tests**: Ensure your code has appropriate test coverage

5. **Run Tests**: Verify all tests pass
   ```bash
   npm test
   ```

6. **Submit a Pull Request**: Open a PR against the main branch

## Pull Request Guidelines

- Fill in the required PR template
- Include tests for new features
- Update documentation as needed
- Ensure CI tests pass
- Follow existing code style

## Coding Conventions

- Use ESLint for JavaScript/TypeScript linting
- Follow the style guide enforced by our linting rules
- Write meaningful commit messages following Conventional Commits format

## Smart Contract Development

When developing smart contracts:

- All contracts must be thoroughly tested
- Security is paramount - consider edge cases
- Document your functions with natspec comments
- Ensure gas efficiency

## Frontend Development

For the React frontend:

- Use functional components and hooks where possible
- Maintain responsive design principles
- Keep accessibility in mind
- Follow component structure guidelines

## Review Process

All submissions require review before being merged. Reviewers will check for:

- Functionality: Does it work as expected?
- Security: Are there any vulnerabilities?
- Performance: Is it efficient?
- Style: Does it follow project conventions?
- Documentation: Is it well-documented?

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.