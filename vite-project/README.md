# Gmail Clone

A modern, responsive Gmail clone built with React and Vite, featuring a sleek dark theme design and smooth user experience.

## 🚀 Features

- **Modern UI/UX**: Clean, Gmail-inspired interface with dark theme
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dynamic Styling**: SCSS-based styling system with reusable color variables and font weights
- **Component Architecture**: Modular React components for maintainability
- **Fast Development**: Hot Module Replacement (HMR) with Vite for rapid development

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: SCSS with CSS custom properties
- **Linting**: ESLint with React-specific rules
- **Package Manager**: npm

## 📦 Project Structure

```
vite-project/
├── src/
│   ├── Pages/
│   │   └── Login/
│   │       ├── Login.jsx          # Login component
│   │       └── Login.scss         # Login-specific styles
│   ├── SCSS/
│   │   ├── _colors.scss           # Color system and font weights
│   │   └── colors.css             # Compiled CSS output
│   ├── assets/
│   │   ├── google_logo.png        # Google logo
│   │   └── react.svg              # React logo
│   ├── App.jsx                    # Main App component
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/
│   └── vite.svg                   # Vite logo
├── .gitignore                     # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── README.md                      # This file
└── vite.config.js                 # Vite configuration
```

## 🎨 Design System

The project includes a comprehensive design system with:

### Color Palette
- **Backgrounds**: Dark theme with multiple surface variations
- **Text**: High-contrast text colors for readability
- **Interactive**: Hover and active states for buttons and links
- **Status**: Success, error, warning, and info colors

### Typography
- **Font Weights**: Dynamic font weight system (100-900)
- **Utility Classes**: Ready-to-use font weight classes (`.fw-100` to `.fw-900`)
- **CSS Variables**: Custom properties for consistent theming

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshat-619/gmail-clone.git
   cd gmail-clone/vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## 🔧 Development

### Adding New Components

1. Create component files in the appropriate directory
2. Use the established SCSS variables from `_colors.scss`
3. Follow the existing naming conventions
4. Import and use components in `App.jsx` or parent components

### Styling Guidelines

- Use SCSS variables from `_colors.scss` for consistency
- Leverage utility classes for common styles
- Follow the BEM methodology for CSS class naming
- Ensure responsive design with mobile-first approach

### Code Quality

The project uses ESLint with React-specific rules to maintain code quality. Run `npm run lint` to check for any issues before committing.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://akshat-619.github.io/gmail-clone/) (when deployed)
- [GitHub Repository](https://github.com/Akshat-619/gmail-clone)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

**Built with ❤️ using React and Vite**
