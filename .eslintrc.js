module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    // "eslint-comments",
    // "promise",
    // "unicorn",
  ],
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.vue"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": ["error"]
      }
    }
  ],
  rules: {
    "no-underscore-dangle": 'off',
    'max-len': 'off',
    'import/no-cycle': 'off',

    /**
     * Lỗi ngoại trừ :
     * a || b
     * a && b()
     * a() || (b = c)
     * a ? b() : c()
     * a ? b() || (c = d) : e()
     */
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],

    /**
     * Cho phép ngắt dòng ( string dom )
     */
    "operator-linebreak": "off",
  },
};
