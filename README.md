# MykPolo Portfolio

Minimalist Brutalist Portfolio Website - "Chaos to Structure"

## Current Implementation Status

✅ **Completed Features:**
- Fontshare font integration (Panchang for headings, General Sans for body)
- Custom Tailwind configuration with brand colors and fonts
- Clean global CSS reset
- Smooth scroll implementation with Lenis
- Loading screen with spinning "MYK" and "POLO" animation
- Hero section with rotating triangle and name reveal
- Header with mix-blend-mode difference effect
- Proper z-index layering (Loading > Header > Content)
- useGSAP hook implementation for all animations

## Project Overview

A high-performance portfolio website built with Next.js 14+, featuring:
- **Brutalist Design Philosophy**: Raw, unrefined aesthetic with monochromatic black/white color scheme
- **Geometric Evolution Concept**: Visual progression representing chaos transforming into structure
- **Smooth Animations**: GSAP-powered transitions with proper hook implementation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional Typography**: Fontshare fonts for premium typography

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + useGSAP hook
- **Smooth Scroll**: Lenis
- **Fonts**: Fontshare (Panchang, General Sans)
- **Package Manager**: npm

## Getting Started

### Installation

```bash
# Navigate to project directory
cd mykpolo-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Folder Structure

```
mykpolo-portfolio/
├── components/
│   ├── layout/          # Layout components (Header)
│   ├── sections/        # Page sections (ProjectCard - deprecated)
│   ├── ui/             # UI components (LoadingScreen, Button)
│   └── utils/          # Utility components (SmoothScroll)
├── hooks/              # Custom React hooks (useScroll)
├── public/             # Static assets
│   └── assets/         # Images, fonts, media
├── src/
│   ├── app/            # Next.js App Router pages
│   └── fonts/          # Local font files
└── styles/             # Global CSS files
```

## Key Features

### Design System
- **Color Palette**: 
  - `brand-black`: #000000
  - `brand-white`: #FFFFFF
- **Typography**: 
  - Headings: Panchang (font-display)
  - Body: General Sans (font-sans)
- **Layout**: Responsive container system with custom breakpoints

### Animations
- Loading screen entrance with opposing rotations
- Hero section reveal with triangle rotation and text fade-in
- Smooth scroll navigation
- Interactive header with overlay menu

### Components
- **LoadingScreen**: Fullscreen animated intro sequence
- **Header**: Fixed navigation with mix-blend-mode effect
- **SmoothScroll**: Lenis-powered smooth scrolling wrapper
- **Button**: Reusable button component with multiple variants

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## Customization

### Fonts
Fonts are loaded via Fontshare CDN in `src/app/layout.tsx`. To change fonts:
1. Update the Fontshare link in the layout
2. Modify `tailwind.config.ts` fontFamily settings
3. Update CSS classes as needed

### Colors
Modify colors in `tailwind.config.ts`:
```typescript
colors: {
  'brand-black': '#000000',
  'brand-white': '#FFFFFF',
}
```

### Animations
All animations use the `useGSAP` hook:
- Adjust timing, easing, and effects in component files
- Timeline sequences are managed within each component
- GSAP plugins are registered globally

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Other static hosting platforms

Build command: `npm run build`
Output directory: `.next`

## Philosophy

"Chaos to Structure" represents the journey from raw creative energy to purposeful, structured digital experiences. Every design decision follows this evolutionary path, transforming disorder into geometric harmony.