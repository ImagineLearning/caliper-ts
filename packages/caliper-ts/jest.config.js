module.exports = {
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/src/index.ts',
		'<rootDir>/src/test/',
		'<rootDir>/src/caliper-spec',
	],
	moduleNameMapper: {
		// Need to map to the UMD build of ky for tests, since Jest can't properly handle ES modules
		'^ky$': require.resolve('ky/umd'),
	},
	setupFiles: ['<rootDir>/setupTests'],
	testResultsProcessor: 'jest-teamcity-reporter',
};
