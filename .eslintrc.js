module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    __DEV__: "readonly"
  },
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json"
      }
    }
  ],
  rules: {
    semi: 0,
    "comma-dangle": 0,
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-shadow": 2,
    "react-native/no-inline-styles": 2,
    "react/no-unstable-nested-components": [2, { allowAsProps: true }],
    quotes: [2, "double", "avoid-escape"]
  },
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "react",
    "react-hooks",
    "react-native",
    "unused-imports"
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        project: "tsconfig.json"
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"]
      },
      "babel-module": {
        root: ["./src"]
      }
    }
  }
}
