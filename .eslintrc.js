module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended" // if using TypeScript
  ],
  "parser": "@typescript-eslint/parser", // if using TypeScript
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint" // if using TypeScript
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off" // for React 17+ and Next.js
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
