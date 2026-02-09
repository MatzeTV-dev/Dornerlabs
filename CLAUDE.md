# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Dornerlabs is a portfolio website with business demo showcases. The repository contains:

- **Main/** - Main website content (dornerlabs.com) - currently being set up
- **Portfolio/** - Portfolio subdomain showcasing developer work and skills
- **Demos/** - Demo subdomain with 6 business website templates for different industries

### Domain Structure

The repository is organized for deployment across multiple domains/subdomains:

- `Main/` → dornerlabs.com (main site)
- `Portfolio/` → portfolio.dornerlabs.com (or similar subdomain)
- `Demos/` → demos.dornerlabs.com (or similar subdomain)

Each directory is independent and can be deployed separately to its respective domain/subdomain.

## Architecture

### Portfolio Site (Portfolio/)

Single-page application built with vanilla HTML/CSS/JavaScript focusing on performance and SEO.

**Structure:**
- `index.html` - Main portfolio page with inline critical CSS for performance
- `css/style.css` - Main stylesheet with CSS custom properties
- `css/custom-icons.css` - Custom icon definitions
- `js/script.js` - Interactive features (mobile nav, animations, scroll effects)
- `assets/` - Images, icons, and project resources
- `.htaccess` - Apache configuration for compression, caching, and security headers

**Key Architecture Patterns:**
- Performance-optimized with critical CSS inlined in `<head>`
- Non-critical CSS loaded via `preload` with `onload` fallback
- Font Awesome and Devicon loaded with `font-display: swap`
- CSS custom properties in `:root` for theming (dark mode color scheme)
- Mobile-first responsive design with hamburger menu
- Accessibility features: skip links, ARIA labels, keyboard navigation

### Demo Sites (Demos/)

Six standalone business website templates, each in its own directory:
- `autohaus/` - Car dealership template
- `baeckerei/` - Bakery template
- `cafe/` - Café/bar template
- `friseur/` - Hair salon template
- `handwerk/` - Craftsman/handyman template
- `restaurant/` - Restaurant template

**Common Structure per Demo:**
```
demo-name/
  ├── index.html
  ├── css/
  │   └── style.css
  └── js/
      └── script.js
```

**Shared Patterns:**
- Vanilla HTML/CSS/JavaScript (no frameworks)
- Font Awesome icons via CDN
- Mobile hamburger navigation
- Contact forms and Google Maps integration
- Smooth scroll navigation
- CSS custom properties for theming

## Development Workflow

### Viewing Sites Locally

All sites are static HTML and can be opened directly in a browser:

```bash
# Open portfolio site
start Portfolio/index.html

# Open a demo site
start Demos/autohaus/index.html
```

Or use a local server for testing (handles relative paths better):

```bash
# Using Python
cd Portfolio
python -m http.server 8000

# Using PHP
cd Portfolio
php -S localhost:8000

# Using Node.js (if http-server is installed)
cd Portfolio
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

### Making Changes

**For Portfolio site:**
1. Edit `Portfolio/index.html` for content/structure
2. Edit `Portfolio/css/style.css` for styling
3. Edit `Portfolio/js/script.js` for interactivity
4. Keep critical CSS inline in `<head>` for above-the-fold performance
5. Test responsive design at mobile, tablet, and desktop breakpoints

**For Demo sites:**
1. Each demo is independent - changes don't affect others
2. Edit `index.html` for structure
3. Edit `css/style.css` for styling
4. Edit `js/script.js` for interactivity

### Important Constraints

**Performance:**
- Portfolio site optimizes for Core Web Vitals (LCP, FID, CLS)
- Keep critical CSS under 14KB for first render
- Use WebP for images
- Preload critical assets
- Defer non-critical CSS/JS

**Browser Compatibility:**
- Support modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Use CSS custom properties (no IE11 support needed)
- Test smooth scroll, backdrop-filter, and grid/flexbox

**Accessibility:**
- Maintain semantic HTML
- Preserve skip links and ARIA labels
- Ensure keyboard navigation works
- Keep color contrast ratios WCAG AA compliant

## File Organization

```
Dornerlabs/
├── Portfolio/              # Main portfolio site
│   ├── index.html         # Single-page portfolio
│   ├── css/
│   │   ├── style.css      # Main styles
│   │   └── custom-icons.css
│   ├── js/
│   │   └── script.js      # Interactive features
│   ├── assets/
│   │   ├── icon/          # Favicons
│   │   ├── projects/      # Project images
│   │   └── Pic.webp       # Profile image
│   ├── .htaccess          # Server configuration
│   ├── sitemap.xml        # SEO sitemap
│   └── robots.txt         # Search engine directives
├── Demos/                 # Business template demos
│   ├── autohaus/          # Car dealership
│   ├── baeckerei/         # Bakery
│   ├── cafe/              # Café/bar
│   ├── friseur/           # Hair salon
│   ├── handwerk/          # Craftsman
│   ├── restaurant/        # Restaurant
│   └── screenshots/       # Demo thumbnails
└── Main/                  # Reserved for future use
```

## Deployment

The site is deployed to https://dornerlabs.com with:
- Apache server (`.htaccess` configuration active)
- GZIP/Deflate compression enabled
- Browser caching configured
- Security headers applied

When modifying `.htaccess`:
- Test compression with browser dev tools
- Verify cache headers
- Ensure security headers don't break functionality

## Code Style

**HTML:**
- Semantic HTML5 elements
- Include `lang` attribute
- Add meaningful `alt` text for images
- Use descriptive `meta` tags for SEO

**CSS:**
- Use CSS custom properties for colors and repeated values
- Mobile-first media queries
- BEM-like class naming (`.card`, `.card__title`, `.card--active`)
- Group related styles with comments

**JavaScript:**
- Vanilla JS (no frameworks/libraries)
- Use const/let (no var)
- Add comments for complex logic
- Handle edge cases (menu closing, keyboard events)
- Use event delegation where appropriate
