module.exports = {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  "setupFiles": [
    "<rootDir>/config/polyfills.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.ts?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).ts?(x)"
  ],
  "testEnvironment": "jsdom",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.tsx?$": "<rootDir>/config/jest/typescriptTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web"
  },
  "moduleFileExtensions": [
    "mjs",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "web.js",
    "js",
    "web.jsx",
    "jsx",
    "json",
    "node"
  ],
  "globals": {
    "ts-jest": {
      "tsConfigFile": "./tsconfig.test.json"
    }
  }
};
