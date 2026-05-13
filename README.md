# Perch Brand Design Assets

Premium logo system for Perch Capital and Perch Terminal - React components with light/dark mode support.

## Brand Overview

**Design Philosophy:** "Apple × Bloomberg" - sleek, premium, financial technology

**Brand Color:** `#C45000` (Perch Orange)

**Typography:** Inter

**Visual System:** Unified "P" monogram where the letterform doubles as a bird in profile:
- Bowl = head
- Counter = eye
- Descender = perch pole

## Products

### Perch Capital
Stock trading app for Pakistan Stock Exchange (like Robinhood for PSX)
- **Logo Detail:** Round eye with upward beak-spike (market tick)
- **Use Case:** Mobile app, web platform

### Perch Terminal  
Agentic ERP with AI agents (like Cursor but for businesses)
- **Logo Detail:** Square pixel eye with straight beak (cursor cue)
- **Use Case:** Desktop app, web platform

## Installation

```bash
npm install
```

## Components

### PerchCapitalLogo

```tsx
import { PerchCapitalLogo } from './components/PerchCapitalLogo';

// Default (light mode)
<PerchCapitalLogo />

// Dark mode
<PerchCapitalLogo theme="dark" />

// Custom size
<PerchCapitalLogo size={48} />

// Monochrome variant
<PerchCapitalLogo variant="monochrome" />
```

### PerchTerminalLogo

```tsx
import { PerchTerminalLogo } from './components/PerchTerminalLogo';

// Default (light mode)
<PerchTerminalLogo />

// Dark mode
<PerchTerminalLogo theme="dark" />

// Custom size
<PerchTerminalLogo size={48} />

// Monochrome variant
<PerchTerminalLogo variant="monochrome" />
```

## Props

Both components accept the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `size` | `number` | `32` | Logo size in pixels |
| `variant` | `'default' \| 'monochrome'` | `'default'` | Color variant |
| `className` | `string` | `''` | Additional CSS classes |

## Color Tokens

```css
--perch-orange: #C45000;
--perch-cream-light: #FFF8F0;
--perch-cream-dark: #1A1410;
```

## Favicon Exports

Favicon variants are available in the `/public` directory:
- `favicon-capital-16x16.png`
- `favicon-capital-32x32.png`
- `favicon-terminal-16x16.png`
- `favicon-terminal-32x32.png`

## Design System Integration

Both Perch Capital and Perch Terminal use:
- **Font:** Inter
- **Backgrounds:** Warm cream tones
- **Accent:** #C45000
- **Spacing:** Consistent design tokens

## License

Proprietary - Perch Brand Assets

## Usage in Your Projects

Copy the component files directly into your React projects, or import them as a reference for implementing the logos in your existing design system.
