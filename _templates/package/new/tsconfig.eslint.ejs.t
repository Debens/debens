---
to: packages/<%=name%>/tsconfig.eslint.json
---
{
    "extends": "./tsconfig.json",
    "references": [],
    "exclude": ["node_modules", "test", "build"],
    "include": ["src", "*.ts"]
}
