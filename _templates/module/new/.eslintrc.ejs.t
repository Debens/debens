---
to: modules/<%=name%>/.eslintrc.yml
---
---
extends: "@debens/eslint-config/react-native.yml"
overrides:
    - files:
          - '*.ts'
          - '*.tsx'
      parserOptions:
          project: ./tsconfig.eslint.json