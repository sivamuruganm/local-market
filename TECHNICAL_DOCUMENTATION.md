# Greenfield Market - Technical Documentation

## Project Overview
**Project Name:** Greenfield Market - Local Community Store Website  
**Version:** 1.0  
**Date:** December 2025  
**Developer:** Vikasini, Shiya, Anuja  
**School:** Taylor High School  
**Organization:** FBLA Web Development Team  
**Technology Stack:** HTML5, CSS3, Vanilla JavaScript  

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Core Features](#core-features)
4. [JavaScript Functions](#javascript-functions)
5. [CSS Architecture](#css-architecture)
6. [Data Management](#data-management)
7. [Responsive Design](#responsive-design)
8. [Performance Optimization](#performance-optimization)
9. [Browser Compatibility](#browser-compatibility)
10. [Deployment Instructions](#deployment-instructions)
11. [Future Enhancements](#future-enhancements)

---

## Architecture Overview

### Frontend Architecture
- **Framework:** Pure HTML5/CSS3/JavaScript (No dependencies)
- **Design Pattern:** Component-based modular structure
- **State Management:** Client-side JavaScript objects
- **Styling:** CSS Grid and Flexbox layout system
- **Images:** Custom SVG illustrations for scalability

### Key Design Principles
- **Mobile-First Responsive Design**
- **Progressive Enhancement**
- **Semantic HTML Structure**
- **Accessibility Standards (WCAG)**
- **Performance Optimization**


---

## File Structure

```
greenfield-market/
├── index.html                          # Main application file
├── styles.css                          # Complete stylesheet
├── script.js                           # All JavaScript functionality
├── presentation-preview.html           # Project presentation
├── Greenfield_Market_Presentation.md   # Markdown presentation source
├── README.md                           # Project documentation
├── .github/
│   └── copilot-instructions.md        # Development guidelines
└── images/
    ├── bread.svg                       # Product images (custom SVG)
    ├── croissant.svg
    ├── muffins.svg
    ├── cookies.svg
    ├── eggs.svg
    ├── milk.svg
    ├── cheese.svg
    ├── yogurt.svg
    ├── butter.svg
    ├── honey.svg
    ├── vegetables.svg
    ├── tomatoes.svg
    ├── lettuce.svg
    ├── carrots.svg
    ├── spinach.svg
    ├── cucumber.svg
    ├── soap.svg
    └── store.svg
```

---

## Core Features

### 1. Product Catalog System
- **Category Filtering:** 5 main categories (Bakery, Dairy, Produce, Pantry, Personal Care)
- **Dynamic Display:** JavaScript-powered show/hide functionality
- **Product Cards:** Uniform layout with image, description, price, and actions
- **Local Sourcing:** Visual badges indicating local/organic products

### 2. Shopping Cart Functionality
- **Add/Remove Items:** Dynamic cart management
- **Quantity Control:** Increment/decrement with validation
- **Price Calculation:** Real-time total updates including delivery fees
- **Delivery Options:** Pickup vs local delivery ($3.99 fee)
- **Modal Interface:** Overlay cart with smooth animations

### 3. Community Partnership Section
- **Business Directory:** 6 featured local partners
- **Contact Information:** Address, phone, and business type
- **Economic Impact Stats:** Jobs created and community investment
- **Partnership Cards:** Uniform design with hover effects

### 4. Responsive Navigation
- **Smooth Scrolling:** Animated section navigation
- **Mobile Menu:** Collapsible navigation for small screens
- **Presentation Access:** Direct link to project documentation

---

## JavaScript Functions

### Core Cart Functions

```javascript
// Primary cart management functions
addToCart(productId, price)          // Add item to cart with duplicate handling
removeFromCart(productId)            // Remove item completely from cart
updateQuantity(productId, newQuantity) // Modify item quantities
updateCartDisplay()                  // Refresh cart UI and totals
toggleCart()                        // Show/hide cart modal
checkout()                          // Process order and clear cart
```

### Product Management

```javascript
filterProducts(category)             // Filter products by category
showNotification(message)           // Display success/error messages
openPresentation()                  // Open project presentation
```

### Event Handlers

```javascript
// DOM Content Loaded
- Navigation link smooth scrolling
- Delivery option change listeners
- Cart modal outside-click closing
```

### Data Structures

```javascript
// Product Object Structure
const products = {
    productId: { 
        name: 'Product Name', 
        price: 0.00 
    }
};

// Cart Item Structure
{
    id: 'productId',
    name: 'Product Name',
    price: 0.00,
    quantity: 1
}
```

---

## CSS Architecture

### Layout System
- **CSS Grid:** Main product grid with auto-fit columns
- **Flexbox:** Navigation, cart items, and component alignment
- **Responsive Units:** rem, em, and viewport units for scalability

### Color Scheme
```css
:root {
    --primary-green: #7fb069;        /* Main brand color */
    --dark-green: #2d4a3e;          /* Headers and text */
    --accent-green: #6b9c57;        /* Hover states */
    --light-bg: #f8f9fa;           /* Section backgrounds */
    --orange-accent: #d4772b;       /* Cart and highlights */
}
```

### Component Classes

```css
/* Layout Components */
.navbar                    /* Main navigation bar */
.hero                     /* Homepage hero section */
.products-section         /* Product catalog container */
.partners-section         /* Community partners area */
.about-section           /* About us content */

/* Interactive Elements */
.product-card            /* Individual product display */
.filter-btn              /* Category filter buttons */
.cart-modal              /* Shopping cart overlay */
.partner-card            /* Business partner display */

/* Utility Classes */
.local-badge            /* Local/organic product indicators */
.hidden                 /* Hidden state for filtering */
```

### Animation System
- **Hover Transforms:** translateY(-5px) for cards
- **Filter Transitions:** Smooth opacity and display changes
- **Notification Slides:** slideIn keyframe animation
- **Button States:** Color and transform transitions

---

## Data Management

### Client-Side Storage
- **JavaScript Objects:** Product catalog and cart state
- **No External APIs:** Self-contained application
- **Real-time Updates:** Immediate UI reflection of state changes

### Product Data Schema
```javascript
{
    id: 'unique-identifier',
    name: 'Human-readable name',
    price: 'Float with 2 decimal precision',
    category: 'bakery|dairy|produce|pantry|personal-care',
    description: 'Product details',
    local: 'Boolean for local sourcing',
    organic: 'Boolean for organic certification'
}
```

### State Management Flow
1. **User Action** (Add to cart, filter, etc.)
2. **JavaScript Function** processes the action
3. **Data Update** in JavaScript objects
4. **UI Refresh** via DOM manipulation
5. **Visual Feedback** through notifications or animations

---

## Responsive Design

### Breakpoint Strategy
```css
/* Mobile First Approach */
/* Base styles: Mobile (320px+) */

@media (min-width: 768px) {
    /* Tablet adjustments */
}

@media (min-width: 1024px) {
    /* Desktop optimizations */
}

@media (min-width: 1200px) {
    /* Large screen enhancements */
}
```

### Grid Responsiveness
- **Products:** `repeat(auto-fit, minmax(300px, 1fr))`
- **Partners:** `repeat(auto-fit, minmax(250px, 1fr))`
- **Mobile Override:** Single column on screens < 768px

### Mobile Optimizations
- **Touch-Friendly:** 44px minimum button sizes
- **Readable Text:** 16px minimum font size
- **Simplified Navigation:** Stacked layout
- **Optimized Images:** SVG for infinite scalability

---

## Performance Optimization

### Loading Optimization
- **Minimal Dependencies:** No external libraries
- **Optimized Images:** SVG format for small file sizes
- **Efficient CSS:** Minimal specificity and optimized selectors
- **JavaScript Efficiency:** Event delegation and minimal DOM queries

### Runtime Performance
- **Lazy Evaluation:** Cart calculations only when needed
- **Efficient Filtering:** Hide/show instead of DOM manipulation
- **Minimal Reflows:** Batch DOM updates where possible
- **Memory Management:** Event listener cleanup and object reuse

### File Sizes
- **HTML:** ~12KB (uncompressed)
- **CSS:** ~15KB (uncompressed)
- **JavaScript:** ~8KB (uncompressed)
- **Images:** ~2KB per SVG (18 total)
- **Total:** ~60KB complete application

---

## Browser Compatibility

### Supported Browsers
- **Chrome:** 60+ (ES6 support)
- **Firefox:** 55+ (CSS Grid support)
- **Safari:** 10+ (Modern CSS features)
- **Edge:** 16+ (Full ES6 support)

### Feature Requirements
- **CSS Grid:** For layout system
- **Flexbox:** For component alignment
- **ES6:** Arrow functions, const/let, template literals
- **DOM APIs:** querySelector, addEventListener

### Fallbacks
- **CSS Grid:** Flexbox fallback for older browsers
- **ES6:** Can be transpiled with Babel if needed
- **SVG:** PNG fallback images available

---

## Deployment Instructions

### Static Hosting Platforms

#### GitHub Pages
1. Create repository: `sivamuruganm.github.io/local-market`
2. Upload all project files to main branch
3. Enable Pages in repository Settings
4. Access at: `sivamuruganm.github.io/local-market`

### File Checklist
- [ ] index.html (main application)
- [ ] styles.css (all styles)
- [ ] script.js (all functionality)
- [ ] images/ folder (18 SVG files)
- [ ] presentation-preview.html (optional)
- [ ] README.md (documentation)

### Pre-Deployment Testing
1. **Local Testing:** Open index.html in browser
2. **Mobile Testing:** Chrome DevTools mobile emulation
3. **Feature Testing:** Cart, filtering, navigation
4. **Cross-Browser:** Test in Chrome, Firefox, Safari
---




*This technical documentation serves as a comprehensive guide for understanding, maintaining, and extending the Greenfield Market community store website.*