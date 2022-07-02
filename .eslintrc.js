// 0=off, 1=warn, 2=error

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "better-styled-components",
    "prettier",
  ],
  rules: {
    "react/prop-types": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
