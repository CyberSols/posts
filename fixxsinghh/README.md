# FixxSinghh - Mobile Car Repair Website

A modern, fully responsive website for FixxSinghh, Birmingham's trusted mobile car repair service.

## Features

### Design & UI
- **Modern & Professional Design**: Clean, contemporary layout with gradient accents
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Fluid animations throughout the site
- **Interactive Elements**: Hover effects, scroll animations, and parallax effects

### Animations & Effects
- **Scroll Animations**: Elements fade in as you scroll down the page
- **Floating Cards**: Animated floating cards in the hero section
- **Parallax Effects**: Subtle parallax scrolling for depth
- **Counter Animation**: Animated statistics that count up when visible
- **Hover Transitions**: Smooth transitions on buttons and cards
- **Loading Indicators**: Scroll indicator and smooth page transitions

### Sections

#### 1. Navigation
- Fixed navigation bar that becomes sticky on scroll
- Mobile-responsive hamburger menu
- Smooth scroll to sections
- Active link highlighting based on scroll position

#### 2. Hero Section
- Eye-catching gradient background
- Clear call-to-action buttons
- Feature badges highlighting key services
- Floating cards with parallax mouse movement
- Animated scroll indicator

#### 3. Services Section
- Grid layout showcasing 6 main services:
  - Full Car Services
  - Brake Services
  - Lighting Solutions
  - General Repairs
  - Inspections
  - Custom Requests
- Animated service cards with hover effects
- Icon animations on hover

#### 4. About Section
- Feature highlights with icons
- Animated statistics counter
- Responsive grid layout
- Hover effects on feature cards

#### 5. Tagline Section
- Branded message: "We do the Fixing, you do the relaxing"
- Gradient background matching hero section

#### 6. Contact Section
- Contact information cards with hover effects
- Working contact form with validation
- Success notification on form submission
- Grid layout for contact info and form

#### 7. Footer
- Multi-column footer layout
- Quick links and service links
- Contact information
- Responsive grid design

### Interactive Features
- **Mobile Menu**: Fully functional hamburger menu for mobile devices
- **Smooth Scrolling**: Click any navigation link for smooth scroll to section
- **Back to Top Button**: Appears when scrolling down, smooth return to top
- **Form Handling**: Contact form with client-side validation
- **Notification System**: Success messages for form submissions
- **Keyboard Accessible**: Full keyboard navigation support

### Performance Optimizations
- Debounced scroll events
- Throttled resize events
- Intersection Observer for efficient scroll animations
- Lazy loading support for images
- Optimized CSS animations

### Responsive Breakpoints
- **Desktop**: > 968px (full layout)
- **Tablet**: 640px - 968px (adjusted grid layouts)
- **Mobile**: < 640px (single column, stacked layout)

## File Structure

```
fixxsinghh/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
└── README.md           # Documentation
```

## Customization

### Update Contact Information
Edit the following in `index.html`:
- Phone number: Search for `+44 XXX XXX XXXX` and replace
- Email: Search for `info@fixxsinghh.co.uk` and update if needed
- Working hours: Update in the contact section

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #ff6b35;      /* Main brand color */
    --secondary-color: #004e89;     /* Secondary color */
    --gradient-primary: ...;        /* Primary gradient */
}
```

### Modify Services
Update the services section in `index.html` to add, remove, or modify service offerings.

### Form Integration
To connect the contact form to a backend:
1. Update the form submission handler in `script.js`
2. Replace the console.log with an actual API call
3. Add your backend endpoint URL

Example:
```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        }
    } catch (error) {
        showNotification('Something went wrong. Please try again.', 'error');
    }
});
```

## Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used
- HTML5
- CSS3 (with CSS Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins)

## Performance
- Lightweight: ~47KB total (HTML + CSS + JS)
- No external dependencies
- Optimized animations
- Fast loading time

## Accessibility Features
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus trap in mobile menu
- Proper heading hierarchy
- Alt text for images (when added)

## Getting Started

1. Open `index.html` in a web browser
2. For local development, use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (with http-server)
   npx http-server
   ```
3. Visit `http://localhost:8000` in your browser

## Future Enhancements
- Add real images for services and team
- Integrate with booking system
- Add customer testimonials section
- Include gallery/portfolio section
- Add blog section for car maintenance tips
- Implement multi-language support
- Add live chat functionality
- Integrate Google Maps for service area
- Add online payment integration

## License
All rights reserved - FixxSinghh 2025

## Support
For support or questions, contact: info@fixxsinghh.co.uk
