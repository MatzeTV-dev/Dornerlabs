# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Matthias Dorner's personal portfolio website showcasing professional experience, technical skills, and projects. The site is built with vanilla HTML, CSS, and JavaScript with a programming-themed design aesthetic.

## Project Structure

```
Website/
├── index.html          # Main portfolio page
├── css/
│   └── style.css      # All styles and animations
├── js/
│   └── script.js      # Interactive features and animations
└── assets/
    └── Pic.jpg        # Profile image
```

## Development

### Running the Site Locally

This is a static website that requires no build process. To view:

```bash
cd Website
# Open index.html in your browser, or use a simple HTTP server:
python3 -m http.server 8000
# Then navigate to http://localhost:8000
```

### Key Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, animations, gradients, flexbox, grid
- **JavaScript (ES6+)**: Intersection Observer API, DOM manipulation, event handling
- **Font Awesome 6.4.0**: Icons (loaded via CDN)

## Architecture & Design

### Design System

**Color Scheme** (Programming theme):
- Primary: `#00ff88` (Neon green - code highlights)
- Secondary: `#0099ff` (Blue - links and accents)
- Accent: `#ff0080` (Pink - special effects)
- Background: Dark blues (`#0a0e27`, `#050810`, `#141b33`)
- Text: Light blues/grays (`#e4f0fb`, `#8892b0`)

### Page Sections

1. **Hero**: Terminal-style introduction with typing animations
2. **About**: Code block format biography with profile image
3. **Tech Stack**: Interactive skill cards with progress bars
4. **Experience**: Vertical timeline with job history
5. **Projects**: Grid of project cards with hover effects
6. **Footer**: Contact information and social links

### Animation Features

- Glitch effect on hero title
- Terminal typing simulation
- Scroll-triggered animations (Intersection Observer)
- Smooth scrolling navigation
- Hover effects and transitions throughout
- Progress bar animations
- Particle background effects
- Cursor glow effect (desktop only)
- Mobile-responsive hamburger menu

### Interactive Features (JavaScript)

- **Mobile Navigation**: Hamburger menu with animation
- **Scroll Effects**: Navbar styling on scroll, progress indicator
- **Lazy Loading**: Intersection Observer for performance
- **Tech Card Highlighting**: Related skills dim others on hover
- **Easter Egg**: Konami code activation
- **Console Messages**: Developer-friendly console logs

## Content Updates

### Updating Personal Information

**Profile Image**: Replace `Website/assets/Pic.jpg` with your image

**Personal Details**: Edit in `Website/index.html`:
- Line 40-58: Terminal output and hero title
- Lines 75-102: About section code block
- Lines 103-108: About description text

**Contact Info**: Footer section (lines 353-370)

### Adding/Modifying Content

**Tech Stack** (lines 117-182): Add/remove tech cards by copying the `.tech-card` structure

**Experience** (lines 195-286): Timeline items follow a consistent structure with `.timeline-item` containers

**Projects** (lines 299-376): Project cards in `.projects-grid` - update titles, descriptions, and tech tags

## Customization Guidelines

### Colors

All colors are defined in CSS custom properties (`:root` in style.css lines 8-19). Change them once to update the entire site.

### Adding New Sections

1. Add HTML section with appropriate ID
2. Update navigation menu (lines 22-28)
3. Follow existing animation patterns using Intersection Observer
4. Use consistent `.section-title` formatting with code brackets

### Performance Considerations

- Images should be optimized before adding to `assets/`
- Keep animations performant (use transform/opacity for 60fps)
- Mobile-first approach with responsive breakpoints at 768px and 480px
- Minimal external dependencies (only Font Awesome CDN)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- Intersection Observer API
- ES6+ JavaScript features
- Responsive design for mobile/tablet/desktop

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the `Website/` directory contents to your hosting provider.

## Notes

- All content is currently placeholder/example data
- Replace with actual professional experience, projects, and contact information
- Profile picture should be added to `assets/Pic.jpg`
- Social media links in footer need actual URLs (currently `#`)
- Project links need actual GitHub/demo URLs (currently `#`)
