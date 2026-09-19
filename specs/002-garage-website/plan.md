# Implementation Plan: Garage & Car Repair Shop Website

**Branch**: `002-garage-website` | **Date**: 2026-09-19 | **Spec**: [specs/002-garage-website/spec.md](./spec.md)

## Summary

This project involves creating a modern, responsive single-page application (SPA) for a garage and car repair shop. The technical approach leverages Vanilla HTML, CSS, and JavaScript to ensure maximum performance and maintainability without the overhead of heavy frameworks. Key technical features include a dynamic price estimator, a validated booking form with a date/time picker, and seamless WhatsApp/Phone integration for immediate customer contact.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES6+)

**Primary Dependencies**: 
- [Flatpickr](https://flatpickr.js.org/) (for Date/Time picking)
- [Lucide Icons](https://lucide.dev/) (for modern UI icons)
- [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/products/forms/) (for form handling without a backend)

**Storage**: Browser `localStorage` for temporary state; JSON file for service data.

**Testing**: Manual responsive testing across breakpoints; Jest for unit testing logic (e.g., price calculator).

**Target Platform**: Modern Web Browsers (Mobile-first)

**Project Type**: Web Application (Single-Page)

**Performance Goals**: < 1s Load Time (LCP), 60fps animations.

**Constraints**: Must be SEO-friendly; No external backend requirement for the prototype.

## Project Structure

### Documentation (this feature)

```text
specs/002-garage-website/
├── plan.md              # This file
├── spec.md              # Feature specification
└── tasks.md             # Implementation tasks (to be created)
```

### Source Code (repository root)

```text
src/
├── assets/
│   ├── images/          # Service icons, hero images
│   └── icons/           # WhatsApp, Phone, etc.
├── index.html           # Main SPA entry point
├── style.css            # Vanilla CSS with CSS Variables
└── script.js            # Main application logic
    ├── services.js      # Service data and logic
    ├── estimator.js     # Price calculation logic
    └── booking.js       # Form handling and validation
```

## Implementation Phases

### Phase 1: Layout & Styling (The "Shell")
- Implement a responsive header with navigation.
- Design a high-impact Hero section with "Emergency Call" and "Book Now" CTA.
- Create the "Services" grid section.

### Phase 2: Dynamic Features
- **Price Estimator**: Build a UI component that allows users to select services and see a live total.
- **Booking Form**: Integrate Flatpickr for date/time selection. Implement validation for contact fields.
- **Review Section**: Implement a simple slider or grid for customer testimonials.

### Phase 3: Integrations
- **WhatsApp**: Implement a floating action button (FAB) that links to the WhatsApp API.
- **Emergency Call**: Ensure the call button is prominent on mobile views using `tel:` links.
- **Form Submission**: Hook up the booking form to a static-friendly service (e.g., Formspree).

### Phase 4: Polish & Performance
- Add CSS transitions for smooth hover states and mobile menu.
- Optimize images for fast loading.
- Final cross-browser and mobile responsiveness check.

## Success Metrics (Technical)
- All interactive elements functional without console errors.
- 100% responsive design across 320px to 1440px widths.
- Form validation prevents empty/malformed submissions.
