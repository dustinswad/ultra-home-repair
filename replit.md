# Ultra Home Repair Website

## Overview

This is a static website for Ultra Home Repair, a handyman service business based in Orange County, CA. The site has been completely rebuilt to mirror the exact structure, styling, and layout of HandyCamNY.com while maintaining Ultra Home Repair's branding and content. Built with pure HTML, CSS, and vanilla JavaScript.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 12, 2025)

- **Image Asset Organization**: Refactored entire project to move all image assets into `/images` directory for better organization
- **Updated All Image References**: Systematically updated all HTML, CSS, and JavaScript files to use new image paths
- **About Page Logo Update**: Replaced tools workspace image with company logo in "Why I Started" section, increased size by 20%
- **File Structure Cleanup**: Maintained favicon.ico at root level while organizing all other images in dedicated directory
- **Path Standardization**: All image references now use consistent `images/` prefix across entire codebase
- **EmailJS Forms Restored**: Reverted from HubSpot back to EmailJS contact forms on user request
- **Portfolio Slideshow Navigation Fixed**: Fixed missing right navigation button by correcting CSS class name mismatches
- **New Furniture Assembly Slide**: Added slide #13 with custom SVG illustration for furniture assembly services

### Previous Changes (August 11, 2025)
- **Hero Section Optimization**: Fine-tuned hero image display and contact form positioning for optimal visual balance
- **Contact Form Integration**: Connected homepage quote form to same EmailJS service as contact page for unified functionality
- **Navigation Enhancement**: Added prominent call button with phone number (949) 371-6423 to header across all pages
- **EmailJS Implementation**: Added EmailJS library and configuration to homepage for proper form submission handling
- **Page Spacing Improvements**: Added consistent padding between header and content on About page (200px) and Realtors page (160px)
- **Form Validation**: Implemented comprehensive validation, error handling, and success messages for both contact forms
- **Hero Section Removal**: Removed hero section from Realtors page per user request for cleaner layout
- **Contact Form Sizing**: Adjusted homepage contact form to 90% scale with 360px max-width for better proportions

### Previous Changes (August 8, 2025)
- **Interactive Portfolio Slideshow**: Converted portfolio page to fully functional slideshow with 12 project slides
- **Advanced Navigation**: Added arrow buttons, dot indicators, keyboard controls, and mobile swipe support
- **Post-Inspection Repairs**: Added dedicated slide showcasing comprehensive repair list for Realtors and home owners
- **Image Layout Optimization**: Adjusted slides to 2:1 ratio (images 2/3, descriptions 1/3) for better visual impact
- **Copy Updates**: Refined slide descriptions including "Closet System Installation" and "Built-in Storage Solutions"
- **Full Image Display**: Optimized CSS to show complete post-inspection repair list without cropping
- **Professional Positioning**: Positioned post-inspection repairs as slide #2 to highlight escrow closing services
- **Service Area Update**: Updated from "Irvine, CA and surrounding area" to "Orange County" across entire website
- **Legal Disclaimer Removal**: Removed California Business & Professions Code § 7048 disclaimer from all page footers
- **Realtors Page**: Created dedicated page targeting real estate professionals with specialized services (August 10, 2025)

### Previous Changes (January 29, 2025)
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
- **Legal Disclaimer**: Removed California Business & Professions Code § 7048 disclaimer from all page footers
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
4. **Portfolio Page (portfolio.html)**: Interactive slideshow showcasing completed projects
5. **Realtors Page (realtors.html)**: Specialized services and solutions for real estate professionals
6. **Contact Page (contact.html)**: Contact information and quote request functionality

### Interactive Features
- **Mobile Menu Toggle**: JavaScript-powered hamburger menu
- **Portfolio Slideshow**: Interactive slideshow with navigation arrows, dot indicators, keyboard controls, and mobile swipe
- **Smooth Scrolling**: Enhanced navigation for anchor links
- **Responsive Images**: Optimized display across all device sizes with special handling for post-inspection repair documentation

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
- **Local Business Focus**: Content optimized for Orange County service area
- **Mobile Responsive**: Google-friendly responsive design