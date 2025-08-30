# React + TypeScript + Vite Test Platform

This project is a modern test platform built with React, TypeScript, and Vite. It features a clean UI, user authentication, subject and topic management, and interactive test pages. The UI leverages [Material UI (MUI)](https://mui.com/) for a responsive and customizable design.

## Getting Started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used

- React 19
- TypeScript
- Vite
- Material UI (MUI)
- React Router DOM

## ESLint & TypeScript

The project includes ESLint and TypeScript configurations for maintaining code quality. For advanced linting, consider expanding your ESLint setup as shown below:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.

## Usage

1. Log in using any credentials (no backend required).
2. Browse the list of subjects and view topics in a modal.
3. Select a topic to view details and start a test.

## License

© Sitemark, 2024

---

For questions or suggestions, please use
