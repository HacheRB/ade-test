/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	clearMocks: true,
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/test/**/*.ts'],
}
