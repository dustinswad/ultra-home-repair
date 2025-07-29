# Ultra Home Repair Website

## Overview

This is a static website for Ultra Home Repair, a handyman service business based in Irvine, CA. The site has been completely rebuilt to mirror the exact structure, styling, and layout of HandyCamNY.com while maintaining Ultra Home Repair's branding and content. Built with pure HTML, CSS, and vanilla JavaScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 29, 2025)

- **Complete HandyCamNY Clone**: Rebuilt entire website to match HandyCamNY.com structure exactly
- **New Color Scheme**: Updated to use HandyCamNY's orange primary color (#ff5a33)
- **Header Redesign**: Fixed white header with 80px height, box shadow, and uppercase navigation
- **Typography Update**: Switched to Open Sans font family matching HandyCamNY
- **Layout Restructure**: Implemented HandyCamNY's section spacing, grid systems, and breakpoints
- **Button System**: Added .btn and .btn--primary classes with HandyCamNY styling
- **Hero Section**: Full viewport height with gradient overlay and centered content
- **Service Cards**: White cards with circular orange icons and hover animations
- **Responsive Design**: Exact mobile navigation and breakpoint behavior as HandyCamNY
- **Personal About Section**: Added Dustin's personal photo and story to About page
- **Contact Information**: Updated all phone numbers to (949) 371-6423 across entire site
- **Email Removal**: Removed all email addresses from website per user request
- **Legal Disclaimer**: Added California Business & Professions Code § 7048 disclaimer to all page footers
- **EmailJS Optimization**: Fixed infinite loop by restricting EmailJS initialization to contact page only

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML5, CSS3, and vanilla JavaScript
- **HandyCamNY Structure**: Cloned exact layout, classes, and styling from HandyCamNY.com
- **Multi-page Structure**: Traditional multi-page application with separate HTML files
- **Responsive Design**: Exact mobile navigation and breakpoints as HandyCamNY
- **Progressive Enhancement**: Core functionality works without JavaScript

### Design System (HandyCamNY Clone)
- **Color Scheme**: 
  - Primary: HandyCamNY Orange (#ff5a33)
  - Text Dark: (#232323)
  - Text Body: (#333333) 
  - White Background: (#ffffff)
  - Light Gray Sections: (#f8f9fa)
- **Typography**: Open Sans font family, exact weights and sizes as HandyCamNY
- **Layout**: Exact container widths, section padding, and grid systems as HandyCamNY

## Key Components

### Navigation System
- **Sticky Header**: Fixed navigation bar with company logo and menu
- **Mobile Navigation**: Hamburger menu with JavaScript toggle functionality
- **Active States**: Visual indication of current page in navigation

### Page Structure
1. **Homepage (index.html)**: Hero section, services highlight, company introduction
2. **About Page (about.html)**: Company history and experience details
3. **Services Page (services.html)**: Comprehensive service listings organized by category
4. **Contact Page (contact.html)**: Contact information and quote request functionality

### Interactive Features
- **Mobile Menu Toggle**: JavaScript-powered hamburger menu
- **Smooth Scrolling**: Enhanced navigation for anchor links
- **Responsive Images**: Optimized display across all device sizes

## Data Flow

### Static Content Delivery
- **No Backend**: All content is static HTML served directly
- **Asset Loading**: Images and stylesheets loaded via standard HTTP requests
- **Contact Forms**: Uses mailto links for direct email contact (no server-side processing)

### User Interactions
1. **Navigation**: Client-side routing through standard HTML links
2. **Mobile Menu**: JavaScript event handlers toggle menu visibility
3. **Contact**: Direct email links and phone number for user contact

## External Dependencies

### Third-Party Resources
- **Font Awesome**: Icon library loaded from CDN (v6.0.0)
- **System Fonts**: Relies on operating system fonts for typography
- **No Frameworks**: Minimal external dependencies for fast loading

### Assets
- **Company Logo**: Embedded as base64 SVG in HTML
- **Hero Image**: Background image for homepage hero section
- **Favicon**: Standard web icon for browser tabs

## Deployment Strategy

### Static Hosting
- **Platform**: Designed for static web hosting (Replit, Netlify, GitHub Pages, etc.)
- **No Build Process**: Files can be served directly without compilation
- **CDN Ready**: All assets are web-optimized for content delivery networks

### Performance Considerations
- **Minimal Dependencies**: Reduced external requests for faster loading
- **Optimized Images**: Compressed images for web delivery
- **CSS Organization**: Single stylesheet for efficient caching
- **JavaScript**: Minimal vanilla JS for enhanced functionality without framework overhead

### SEO Optimization
- **Semantic HTML**: Proper heading structure and semantic elements
- **Meta Tags**: Optimized title and description tags for each page
- **Local Business Focus**: Content optimized for Irvine, CA service area
- **Mobile Responsive**: Google-friendly responsive design