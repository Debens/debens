# `@debens/theme`

> Basic theming through semantic naming and tokenisation following closely with [IBM Carbon](https://carbondesignsystem.com/).

## Usage

```tsx
import React from 'react'

import { theme } from '@debens/theme'
import { ThemeProvider } from 'styled-system'

export const App: React.VFC = () =>
    <ThemeProvider theme={themes.light}>
        {...}
    </ThemeProvider>

```
