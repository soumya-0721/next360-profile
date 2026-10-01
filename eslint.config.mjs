import { createRequire } from "node:module";

import globals from "globals";

const require = createRequire(import.meta.url);

// eslint-config-next/parser is a thin re-export of this. Requiring it
// directly drops eslint-config-next, whose typescript-eslint dependency
// peer-caps TypeScript <6.1.0 and breaks `npm install` under TS 7.

const nextPlugin = require("@next/eslint-plugin-next");
const importPlugin = require("eslint-plugin-import-x");
const a11yPlugin = require("eslint-plugin-jsx-a11y");
const reactPlugin = require("eslint-plugin-react");
const hooksPlugin = require("eslint-plugin-react-hooks");
// eslint-plugin-import caps eslint at ^9 and calls SourceCode methods
// removed in ESLint 10; import-x is the maintained fork with ^10 support.
const { analyze } = require("eslint-scope");
const nextParser = require("next/dist/compiled/babel/eslint-parser");

/*
  ESLint 10 requires scopeManager.addGlobals(). Next's compiled
  @babel/eslint-parser bundles an old eslint-scope that predates that method,
  so we keep its AST and rebuild the scope tree with eslint-scope directly.
  Two details matter: ecmaVersion must be numeric because
  __isES6() compares it with >= 6, and "latest" >= 6 is false.
*/
function parseWithModernScope(code, options) {
  const parsed = nextParser.parseForESLint(code, options);
  const raw = options.ecmaVersion;
  const ecmaVersion =
    raw === "latest" || raw == null ? 2022 : Number.parseInt(raw, 10);

  const scopeManager = analyze(parsed.ast, {
    ignoreEval: true,
    optimistic: false,
    directive: false,
    nodejsScope: false,
    impliedStrict: false,
    sourceType: parsed.ast.sourceType || "module",
    ecmaVersion,
    childVisitorKeys: parsed.visitorKeys,
  });

  return {
    ast: parsed.ast,
    scopeManager,
    visitorKeys: parsed.visitorKeys,
  };
}

const parser = {
  meta: { name: "next360/parser", version: "1.0.0" },
  parseForESLint: parseWithModernScope,
  parse: (code, options) => parseWithModernScope(code, options).ast,
};

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "scripts/**",
      "**/*.tsbuildinfo",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        requireConfigFile: false,
        ecmaFeatures: { jsx: true },
        babelOptions: {
          presets: ["next/babel"],
          babelrc: false,
          configFile: false,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "jsx-a11y": a11yPlugin,
      "import-x": importPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      // eslint-config-next/core-web-vitals minus typescript-eslint
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...nextPlugin.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-unescaped-entities": "error",
      "react/self-closing-comp": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      ...a11yPlugin.configs.recommended.rules,

      "import-x/no-duplicates": "warn",
      "import-x/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "no-unused-vars": "off",
      "no-undef": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      eqeqeq: ["error", "smart"],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Type-aware rules need typescript-eslint, which does not support TS 7
      // yet (typescript-eslint/typescript-eslint#10940). tsc --noEmit is the
      // type gate until that lands; Babel-based linting covers the rest.
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.config.{js,mjs,ts}", "scripts/**/*.{js,mjs}"],
    languageOptions: { globals: { ...globals.node } },
    rules: { "no-console": "off" },
  },
];
