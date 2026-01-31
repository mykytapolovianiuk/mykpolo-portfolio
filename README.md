# MykPolo Portfolio

A minimalist, brutalist portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. The design philosophy centers on "Chaos to Structure," featuring raw aesthetics, monochromatic color schemes, and geometric evolution.

## Technical Overview

This project leverages modern frontend technologies to deliver a high-performance, interactive user experience.

### Core Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP (GreenSock Animation Platform) with @gsap/react
- **Scrolling**: Lenis for smooth scroll behavior
- **Typography**: Fontshare (Panchang and General Sans)
- **Analytics**: Google Analytics 4 (via @next/third-parties)

### Key Features
- **Performance**: Optimized asset loading, custom font implementation, and efficient React rendering.
- **Responsiveness**: Mobile-first design architecture ensuring compatibility across all device sizes.
- **Interactivity**: 
  - Complex scroll-triggered animations.
  - Custom cursor implementation.
  - Page transition effects and loading sequences.
  - Hidden "Easter Egg" features for enhanced engagement.
- **Tracking**: Integrated GA4 for detailed user behavior analysis, including custom events for project interactions and navigation.

## Setup and Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is optimized for deployment on Vercel.

### Environment Variables
To enable Google Analytics usage tracking, you must configure the following environment variable in your deployment settings:

- `NEXT_PUBLIC_GA_ID`: Your Google Analytics Measurement ID (e.g., G-XXXXXXXXXX)

### Build Command
```bash
npm run build
```

## Project Structure
- `src/app`: Page routes and layouts.
- `components/sections`: Main landing page sections (Hero, Evolution, Project, Peace).
- `components/ui`: Reusable UI elements (Cursor, LoadingScreen).
- `lib`: Utility functions and analytics tracking.
- `hooks`: Custom React hooks.
- `styles`: Global CSS and Tailwind directives.

## Contact
Mykyta Polovianiuk - based in Kyiv.
[mykytapolovianiuk.work@gmail.com](mailto:mykytapolovianiuk.work@gmail.com)