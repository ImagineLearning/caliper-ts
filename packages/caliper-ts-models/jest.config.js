module.exports = {
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/src/index.ts',
		'<rootDir>/src/Entities/',
		'<rootDir>/src/Events/',
	],
	testResultsProcessor: 'jest-teamcity-reporter',
};
