import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

export default {
    preset: "ts-jest",
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `<rootDir>/src/`,
    }),
    modulePaths: [`<rootDir>/src/`],
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
    testMatch: ["**/*.spec*{.ts,.js}"],
    verbose: true,
    bail: true,
    clearMocks: true,
    collectCoverage: false,
    // collectCoverageFrom: ["<rootDir>/src/modules/**/useCases/**/*.ts"],
    // coverageDirectory: "coverage",
    // coverageProvider: "v8",
    // coverageReporters: ["text-summary", "lcov"],
};
