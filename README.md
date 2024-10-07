# GradSpace 🎓

GradSpace is a dynamic platform that bridges the gap between students and alumni, fostering relationships, skill-building, and career development. The platform features easy login, a forum for discussions, profile management, a job portal for alumni referrals, live chat, and a section for sharing posts about achievements and events.

## 📑 Table of Contents

1. [✨ Features](#features)
2. [📸 Screenshots](#screenshots)
3. [⚙️ Installation](#installation)
4. [🤝 Contributing](#contributing)

## Features

- 🔐 User authentication and profile management
- 💬 Forum for discussions between students and alumni
- 💼 Job portal for alumni to post referrals and job opportunities
- 📱 Responsive design for seamless user experience across devices
- 🗣️ Live chat for real-time interaction
- 📰 Posts section for sharing achievements and events

## Screenshots

### General Pages

#### Home Page

![Home Page](./screenshots/home_page.png)

#### Login Page

![Login Page](./screenshots/login_page.png)

#### Forum Page

![Forum Page](./screenshots/forum_page.png)

#### Job Portal

![Job Portal](./screenshots/job_portal.png)

#### Profile Management

![Profile Management](./screenshots/profile_management.png)

## Installation

To set up the GradSpace frontend locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/07SUJITH/gradspace-frontend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd gradspace-frontend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Contributing

### Setting up ESLint, Simple Import Sort, and Prettier

To maintain code quality, we use **ESLint** with **Simple Import Sort** and **Prettier** for consistent formatting. Follow these steps to contribute effectively:

1. **Install dependencies:**

   ```bash
   npm install eslint eslint-plugin-simple-import-sort prettier --save-dev
   ```

2. **Add the following ESLint rules:**

- In your `eslint.config.js` file, add `simple-import-sort` as a plugin and include sorting rules for imports and exports:

  ```javascript
  import globals from 'globals';
  import reactHooks from 'eslint-plugin-react-hooks';
  import reactRefresh from 'eslint-plugin-react-refresh';
  import tseslint from 'typescript-eslint';
  import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Import the plugin

  export default tseslint.config(
    { ignores: ['dist', 'src/components/ui/**/*'] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        'simple-import-sort': simpleImportSort, // Add the plugin here
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'simple-import-sort/imports': 'error', // Add the sorting rule for imports
        'simple-import-sort/exports': 'error', // Optional: Add the sorting rule for exports
      },
    },
  );
  ```

3. **Prettier configuration:**

- Create a `.prettierrc` file in your project root with the following configuration:

  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "useTabs": false,
    "trailingComma": "all",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "always",
    "printWidth": 80,
    "htmlWhitespaceSensitivity": "ignore",
    "endOfLine": "lf",
    "singleAttributePerLine": false
  }
  ```

4. **VSCode configuration:**

   To ensure code formatting and linting on save, add the following to your `.vscode/settings.json`:

   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

5. **Run linting and formatting manually:**

   - **Run ESLint:**

     ```bash
     npx eslint .
     ```

   - **Fix linting issues automatically:**

     ```bash
     npx eslint --fix
     ```

   - **Run Prettier to format files:**
     ```bash
     npx prettier --write .
     ```

## Contributing Guidelines

We encourage contributions from the community to improve GradSpace. Follow the steps above to set up your development environment and ensure code quality.

### Oh, you made it through all that? Impressive! 🎉 GradSpace will be launching soon—get ready! 🚀😎

### 🚀 Thank you for being a part of the GradSpace community!
