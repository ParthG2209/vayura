# Contributing to Vayura

Thank you for your interest in contributing to Vayura! This document provides guidelines for contributing to this open-source project.

## Code of Conduct

- Be respectful, inclusive, and constructive in all interactions
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A GitHub account
- Firebase project (for testing)
- Google Gemini API key (for testing)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vayura.git
   cd vayura
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/manasdutta04/vayura.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up environment variables** (see README.md)
6. **Start development server**:
   ```bash
   npm run dev
   ```

## How to Contribute

### Reporting Bugs

- Use [GitHub Issues](https://github.com/manasdutta04/vayura/issues)
- Provide a clear, descriptive title
- Include steps to reproduce the bug
- Specify your environment (OS, Node version, browser, etc.)
- Add screenshots if applicable
- Use the bug report template if available

### Suggesting Features

- Check existing issues first to avoid duplicates
- Clearly describe the feature and its benefits
- Explain your use case
- Consider implementation complexity
- Use the feature request template if available

### Code Contributions

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our coding standards

3. **Test thoroughly**:
   - Test in different browsers
   - Test on different screen sizes
   - Verify no console errors
   - Check that existing features still work

4. **Commit your changes**:
   ```bash
   git commit -m "Add: description of your feature"
   # or
   git commit -m "Fix: description of bug fix"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**:
   - Provide a clear title and description
   - Reference any related issues
   - Add screenshots for UI changes
   - Ensure all checks pass

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer functional patterns
- Use async/await over promises
- Handle errors appropriately

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use proper TypeScript types for props
- Follow the existing component structure
- Use Tailwind CSS for styling (no inline styles)

### File Naming

- Components: `kebab-case.tsx` (e.g., `district-search.tsx`)
- Utilities: `kebab-case.ts` (e.g., `helpers.ts`)
- Pages: `page.tsx` (Next.js App Router convention)

### Git Commit Messages

- Use clear, descriptive messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 72 characters
- Add more details in the body if needed

Examples:
```
Add: District search autocomplete functionality
Fix: Leaderboard percentage calculation error
Update: Improve landing page design
Remove: Unused Prisma dependencies
```

## Testing

- Test your changes manually before submitting
- Test edge cases and error scenarios
- Verify responsive design on mobile and desktop
- Check browser compatibility (Chrome, Firefox, Safari, Edge)

## Documentation

- Update README.md if adding new features
- Document API changes
- Add inline comments for complex logic
- Update type definitions if needed
- Keep DATA_SOURCES.md updated if adding new data sources

## Areas for Contribution

### High Priority

- [ ] Add more Indian districts to the database
- [ ] Improve data source integrations
- [ ] Add unit and integration tests
- [ ] Improve accessibility (a11y)
- [ ] Add internationalization (i18n) support
- [ ] Performance optimizations

### Features

- [ ] Admin panel for verifying tree contributions
- [ ] Advanced data visualization (charts, graphs)
- [ ] District map visualization with Leaflet
- [ ] Mobile app (React Native)
- [ ] Multilingual support (Hindi, regional languages)
- [ ] Social sharing features
- [ ] Email notifications

### Infrastructure

- [ ] Docker Compose configuration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing suite
- [ ] Performance monitoring
- [ ] Error tracking (Sentry, etc.)

### Documentation

- [ ] API documentation
- [ ] Component documentation
- [ ] Deployment guides
- [ ] Video tutorials
- [ ] Blog posts

## Pull Request Process

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure your code**:
   - Follows coding standards
   - Has no linting errors
   - Is properly tested
   - Includes documentation updates

3. **Submit PR** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Testing notes

4. **Respond to feedback** promptly and constructively

## Questions?

- Open a [GitHub Discussion](https://github.com/manasdutta04/vayura/discussions)
- Ask in [GitHub Issues](https://github.com/manasdutta04/vayura/issues)
- Check existing documentation

## Thank You!

Every contribution, no matter how small, makes Vayura better. Thank you for helping make India greener!

---

**Happy contributing!**
