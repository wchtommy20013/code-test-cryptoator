module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    maxWorkers: 1,
    testMatch: ["<rootDir>/src/**/*.spec.(js|ts)"],
    clearMocks: true,
    moduleNameMapper: {
        "@server/(.*)": "<rootDir>/src/$1",
    },
    moduleDirectories: ["src", "node_modules"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    coverageDirectory: "coverage",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/node_modules/",
    ],
    setupFiles: ["<rootDir>/jest.setup.js"],
    coverageReporters: ["json", "html", "text", "lcov"],
};
