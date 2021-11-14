const mainRules = {
	"import/order": [
		1,
		{
			groups: ["builtin", "external", "internal", ["parent", "sibling"]],
			pathGroups: [
				{
					pattern: "nodejs",
					group: "external",
					position: "before",
				},
			],
			pathGroupsExcludedImportTypes: ["builtin"],
			"newlines-between": "always",
			alphabetize: {
				order: "asc",
				caseInsensitive: true,
			},
		},
	],

	"linebreak-style": 0,
	"no-tabs": 0,
	"implicit-arrow-linebreak": 0,
	"operator-linebreak": 0,
	"object-curly-newline": 0,

	"no-nested-ternary": 0,
	"no-bitwise": 1,
};

const typescriptRules = {
	"@typescript-eslint/comma-dangle": 0,
	"@typescript-eslint/indent": 0,
	"@typescript-eslint/quotes": 0,
	"@typescript-eslint/no-unused-vars": 1,
	"@typescript-eslint/comma-dangle": 0,
	"@typescript-eslint/no-misused-promises": 0,
};

module.exports = {
	extends: [
		"eslint:recommended",
		"prettier",

		"plugin:import/recommended",
		"plugin:import/typescript",

		"plugin:sonarjs/recommended",
		"plugin:promise/recommended",
	],
	ignorePatterns: ["build/", "*rc.*", "*config.*", "*.min.*"],
	rules: mainRules,
	plugins: ["prettier", "import", "sonarjs", "promise"],
	env: {
		browser: true,
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "tsconfig.json",
				tsconfigRootDir: ".",
			},
			extends: [
				"plugin:@typescript-eslint/eslint-recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"airbnb-typescript/base",
			],
			plugins: ["@typescript-eslint"],
			rules: Object.assign(typescriptRules, mainRules),
		},
		{
			files: "*.js",
			parser: "esprima",
		},
	],
};
