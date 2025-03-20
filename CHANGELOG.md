# Changelog

## [0.1.1] - 2025-03-20

### Fixed
- Fixed JSX syntax errors by converting JS files to JSX extensions
  - Converted `Sidebar.js` to `Sidebar.jsx`
  - Converted `Navbar.js` to `Navbar.jsx`
  - Converted `Footer.js` to `Footer.jsx`
  - Converted `App.js` to `App.jsx`
  - Updated import statements in `App.jsx` to reference JSX files directly
  - Updated import in `index.js` to reference `App.jsx`

### Technical Notes
- The error was occurring because JSX syntax (React components) was being used in `.js` files
- Vite requires files containing JSX syntax to use the `.jsx` extension
- This change ensures that the project will build and run properly with Vite

## [0.1.0] - 2025-03-19

- Initial release of Carbonix platform
