# Contributing to TRUST.TRAVEL

Thank you for your interest in contributing to **TRUST.TRAVEL**! We welcome improvements, bug fixes, accessible enhancements, and new destination datasets.

## Development Workflow

1. **Fork & Clone** the repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Quality Standards

Before opening a pull request, ensure all verification checks pass:

- **Type Check**:
  ```bash
  npm run type-check
  ```
- **Linting**:
  ```bash
  npm run lint
  ```
- **Automated Tests**:
  ```bash
  npm test
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

## Design System Guidelines

- Headings should use the elegant serif typography (`Cormorant Garamond`).
- Interface and body copy should use `Plus Jakarta Sans` or `Inter`.
- Warm ivory (`#FAF9F6`), surface white (`#FFFFFF`), and charcoal (`#171614`) are the foundational palette.
- Keep animations restrained, respectful of `prefers-reduced-motion`, and purposeful.

## Pull Request Guidelines

- Provide a concise description of what was changed and why.
- Confirm that existing test suites pass.
- Maintain documentation integrity and update relevant markdown files in `docs/` if architectural changes were introduced.
