---
to: modules/<%=name%>/.eslintrc.yml
---
---
extends: "@training/eslint-config/react-native.yml"
overrides:
    - files:
          - '*.ts'
          - '*.tsx'
      parserOptions:
          project: ./tsconfig.eslint.json
          tsconfigRootDir: .