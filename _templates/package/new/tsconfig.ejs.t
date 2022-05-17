---
to: packages/<%=name%>/tsconfig.json
---
{
    "extends": "@training/config-typescript",
    "compilerOptions": {
        "composite": true,
        "strict": true,
        "outDir": "build",
        "moduleResolution": "node",
        "lib": ["es2017"],
        "target": "esnext",
        "allowSyntheticDefaultImports": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "baseUrl": "../../",
        "paths": {
            "@training/*": ["packages/*/src"]
        }
    },
    "references": [],
    "include": ["src", "index.ts"],
    "exclude": ["node_modules", "*.config.*", "*.spec.*"]
}
