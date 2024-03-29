---
to: packages/<%=name%>/package.json
---
{
  "name": "@debens/<%=name%>",
  "version": "0.0.1",
  "description": "> TODO: description",
  "license": "MIT",
  "main": "build/index.js",
  "files": [
      "build"
  ],
  "scripts": {
    "build": "tsc -b",
    "compile": "yarn build --noEmit",
    "clean": "yarn build --clean",
    "test": "jest --passWithNoTests",
    "test:coverage": "yarn test --coverage",
    "test:ci": "yarn test:coverage --ci --maxWorkers 1",
    "lint": "eslint .",
    "lint:fix": "yarn lint --fix",
    "lint:staged": "lint-staged"
  },
  "dependencies": {
    
  },
  "devDependencies": {
    "@babel/core": "^7.17.9",
    "@babel/preset-env": "^7.16.11",
    "@babel/preset-typescript": "^7.16.7",
    "@debens/config-typescript": "^0.0.1",
    "@debens/eslint-config": "^0.0.1",
    "@types/jest": "^27.4.1",
    "babel-jest": "^27.5.1",
    "jest": "^27.5.1",
    "lint-staged": "^12.4.1",
    "prettier": "^2.6.2",
    "tslib": "^2.4.0",
    "typescript": "^4.6.3"
  }
}
