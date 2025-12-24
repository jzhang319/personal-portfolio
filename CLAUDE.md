# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Jack Zhang's personal portfolio website built with Next.js 12, React 18, and Tailwind CSS. It features a single-page application design with smooth scroll navigation, a blog system using Markdown files, and PWA support.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (extends next/core-web-vitals)
npm run export   # Static export (next build && next export)
```

## Architecture

### Data Layer (Static JSON API)
Portfolio content is served from static JSON files in `public/api/`:
- `information.json` - Personal info, social links, contact details
- `portfolios.json` - Project entries with images, URLs, filter tags
- `techskills.json`, `languageskills.json` - Skills with percentages
- `jobexperience.json`, `educationbackground.json` - Resume data
- `services.json`, `clientsreview.json` - Services and testimonials
- `portfoliofilters.json` - Filter categories for portfolio section

Data fetching uses axios via `src/fetchers/` with react-query for caching. The API base URL is set via `NEXT_PUBLIC_API_URL` environment variable.

### Component Structure
```
src/components/
├── containers/   # Page sections (HeroSection, AboutSection, ContactSection, etc.)
├── elements/     # Reusable UI components (Portfolio, Blog, ProgressBar, SocialIcons)
├── layout/       # Layout components (Header, Footer, Navigation, MobileNavigation)
└── utils/        # Utility components (SectionHeading, scroll utilities)
```

### Blog System
Blog posts are Markdown files in `src/posts/` with frontmatter. The blogging utilities in `src/lib/blogging.js` handle:
- Post parsing with gray-matter
- Pagination and category filtering
- Static path generation for Next.js

### State Management
- **AppContext** (`src/context/`) - Global state for UI (blurred background effect)
- **React Query** - Server state and data caching

### Styling
- Tailwind CSS with custom theme (primary: orange `#FFA500`, secondary: green `#AEE272`)
- SCSS for global styles (`src/styles/globals.scss`)
- Custom font: Radio Canada

## Environment Variables

```
NEXT_PUBLIC_API_URL        # Base URL for JSON API (defaults to /api)
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

## Key Integrations
- **EmailJS** - Contact form submissions (configured in `src/settings/settings.js`)
- **Google Analytics** - GA4 tracking (ID: G-F5TCY6RKJZ)
- **Disqus** - Blog comments
- **PWA** - Service worker via next-pwa (disabled in development)

## Homepage Variants
The site includes multiple homepage layouts:
- `pages/index.js` (Homepage2) - Main single-page layout with all sections
- `pages/homepage1.js`, `homepage2.js`, `homepage3.js` - Alternative layouts
