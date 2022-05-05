---
to: modules/<%=name%>/tsconfig.eslint.json
---
{
    "extends": "./tsconfig.json",
    "references": [],
    "exclude": ["node_modules"],
    "include": ["src", "*.config.*", "index.ts"]
}
