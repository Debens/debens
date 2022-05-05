---
to: modules/<%=name%>/.lintstagedrc.yml
---
"*": ["yarn lint", "prettier --write"]