module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/graphql"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "tailwindcss"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "no-irregular-whitespace": "error",
    "indent": ["error", 4],
    "no-trailing-spaces": "error",
    "no-multi-spaces": "error",
    "space-before-blocks": "error",
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "space-infix-ops": "error",
    "eol-last": ["error", "always"],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    "quotes": ["error", "double"],
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/no-contradicting-classname": "error"
  },
}
