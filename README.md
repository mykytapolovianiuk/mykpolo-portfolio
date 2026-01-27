# MykPolo Portfolio

Minimalist Brutalist Portfolio Website - "Chaos to Structure"

## Project Overview

A high-performance portfolio website built with Next.js 14+, featuring:
- **Brutalist Design Philosophy**: Raw, unrefined aesthetic with monochromatic black/white color scheme
- **Geometric Evolution Concept**: Visual progression from square → triangle → circle representing chaos transforming into structure
- **Smooth Animations**: GSAP-powered transitions and scroll-triggered effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
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
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (ProjectCard, Hero)
│   └── ui/             # Reusable UI components (Button, etc.)
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
- **Typography**: Extended sans-serif font (configured via next/font)
- **Layout**: Responsive container system with custom breakpoints

### Animations
- Hero section entrance animations (scale, rotation, opacity)
- Scroll-triggered reveal animations
- Interactive hover effects on project cards
- Smooth scrolling navigation

### Components
- **Header**: Fixed navigation with scroll-aware styling
- **ProjectCard**: Interactive portfolio item with hover effects
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

### Adding Fonts
1. Place font files in `src/fonts/`
2. Update the font configuration in `src/app/layout.tsx`
3. Reference the font in `styles/globals.css`

### Color Scheme
Modify colors in `tailwind.config.ts`:
```typescript
colors: {
  'brand-black': '#000000',
  'brand-white': '#FFFFFF',
}
```

### Animations
Adjust GSAP animations in component files:
- Modify timing, easing, and effects
- Add new scroll-triggered animations
- Customize hover interactions

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Other static hosting platforms

Build command: `npm run build`
Output directory: `.next`

## Philosophy

"Chaos to Structure" represents the journey from raw creative energy to purposeful, structured digital experiences. Every design decision follows this evolutionary path, transforming disorder into geometric harmony.