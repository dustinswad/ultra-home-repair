// Ultra Home Repair - Main JavaScript File
// Consolidated version to eliminate duplicate event listeners

// Global variables
let currentSlide = 0;
let totalSlides = 0;

// Navigation functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio slideshow functions
function initializeSlideshow() {
    const slides = document.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    const dots = document.querySelectorAll('.dot');
    const slideCounter = document.querySelector('.slide-counter');

    if (slides.length === 0) return;

    totalSlides = slides.length;
    currentSlide = 0;

    // Show slide function
    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.style.display = index === n ? 'flex' : 'none';
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });

        // Update counter
        if (slideCounter) {
            slideCounter.textContent = `${n + 1} / ${totalSlides}`;
        }

        currentSlide = n;
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (slides.length > 0) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    const slideContainer = document.querySelector('.portfolio-slideshow');

    if (slideContainer) {
        slideContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        slideContainer.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });
    }

    // Initialize first slide
    showSlide(0);
}

// EmailJS Contact Form Setup
function setupEmailJSForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if EmailJS is available
        if (!window.EMAILJS_CONFIG || typeof emailjs === 'undefined') {
            alert('Form submission requires EmailJS configuration. Please contact us at (949) 371-6423.');
            return;
        }
        
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff5a33';
                field.style.boxShadow = '0 0 0 2px rgba(255, 90, 51, 0.2)';
            } else {
                field.style.borderColor = '#e5e5e5';
                field.style.boxShadow = 'none';
            }
        });
        
        if (!isValid) {
            let errorMsg = contactForm.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: #ff5a33; text-align: center; margin-top: 1rem; font-weight: 600;';
                contactForm.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Please fill in all required fields.';
            return false;
        }
        
        // Remove any error messages
        const errorMsg = contactForm.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('.form-submit-btn');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            phone: contactForm.phone.value,
            address: contactForm.address.value,
            message: contactForm.message.value,
            timeline: contactForm.timeline ? contactForm.timeline.value : 'Contact Form'
        };
        
        // Send email via EmailJS
        emailjs.send(window.EMAILJS_CONFIG.serviceId, window.EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                // Success
                submitButton.innerHTML = 'Message Sent!';
                submitButton.style.backgroundColor = '#28a745';
                
                // Show success message
                let successMsg = contactForm.querySelector('.success-message');
                if (!successMsg) {
                    successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.style.cssText = 'color: #28a745; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #f8fff8; border: 1px solid #28a745; border-radius: 4px;';
                    contactForm.appendChild(successMsg);
                }
                successMsg.innerHTML = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 1 business day.';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                    if (successMsg) {
                        successMsg.remove();
                    }
                }, 5000);
                
            }, function(error) {
                // Error
                console.error('EmailJS Error:', error);
                submitButton.innerHTML = 'Error - Try Again';
                submitButton.style.backgroundColor = '#dc3545';
                
                // Show error message
                let failMsg = contactForm.querySelector('.fail-message');
                if (!failMsg) {
                    failMsg = document.createElement('div');
                    failMsg.className = 'fail-message';
                    failMsg.style.cssText = 'color: #dc3545; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #fff8f8; border: 1px solid #dc3545; border-radius: 4px;';
                    contactForm.appendChild(failMsg);
                }
                failMsg.innerHTML = 'Sorry, there was an error sending your message. Please try again or call us directly at (949) 371-6423.';
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                    if (failMsg) {
                        failMsg.remove();
                    }
                }, 5000);
            });
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff5a33';
                this.style.boxShadow = '0 0 0 2px rgba(255, 90, 51, 0.2)';
            } else {
                this.style.borderColor = '#e5e5e5';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 90, 51)' && this.value.trim()) {
                this.style.borderColor = '#e5e5e5';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// Hero form setup for homepage
function setupHeroForm() {
    const heroForm = document.getElementById('hero-contact-form');
    
    if (!heroForm) {
        return;
    }
    
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if EmailJS is available and config is loaded
        if (!window.EMAILJS_CONFIG || typeof emailjs === 'undefined') {
            alert('Form submission requires EmailJS configuration. Please contact us at (949) 371-6423.');
            return;
        }
        
        const requiredFields = heroForm.querySelectorAll('[required]');
        let isValid = true;
        
        // Validate required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff5a33';
                field.style.boxShadow = '0 0 0 2px rgba(255, 90, 51, 0.2)';
            } else {
                field.style.borderColor = '#e5e5e5';
                field.style.boxShadow = 'none';
            }
        });
        
        if (!isValid) {
            // Create and show error message
            let errorMsg = heroForm.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: #ff5a33; text-align: center; margin-top: 1rem; font-weight: 600;';
                heroForm.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Please fill in all required fields.';
            return false;
        }
        
        // Remove any error messages
        const errorMsg = heroForm.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
        
        // Show loading state
        const submitButton = heroForm.querySelector('.form-submit-btn');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        // Prepare template parameters to match EmailJS template variables
        const templateParams = {
            name: heroForm.name.value,
            email: heroForm.email.value,
            phone: heroForm.phone.value,
            address: heroForm.address.value,
            message: heroForm.description.value,
            timeline: 'Quote Request from Homepage'
        };
        
        // Send email via EmailJS
        emailjs.send(window.EMAILJS_CONFIG.serviceId, window.EMAILJS_CONFIG.templateId, templateParams)
            .then(function(response) {
                // Success
                submitButton.innerHTML = 'Message Sent!';
                submitButton.style.backgroundColor = '#28a745';
                
                // Show success message
                let successMsg = heroForm.querySelector('.success-message');
                if (!successMsg) {
                    successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.style.cssText = 'color: #28a745; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #f8fff8; border: 1px solid #28a745; border-radius: 4px;';
                    heroForm.appendChild(successMsg);
                }
                successMsg.innerHTML = 'Thank you! Your quote request has been sent successfully. We\'ll call you back within 1 business day.';
                
                // Reset form
                heroForm.reset();
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                    if (successMsg) {
                        successMsg.remove();
                    }
                }, 5000);
                
            }, function(error) {
                // Error
                console.error('EmailJS Error:', error);
                submitButton.innerHTML = 'Error - Try Again';
                submitButton.style.backgroundColor = '#dc3545';
                
                // Show error message
                let failMsg = heroForm.querySelector('.fail-message');
                if (!failMsg) {
                    failMsg = document.createElement('div');
                    failMsg.className = 'fail-message';
                    failMsg.style.cssText = 'color: #dc3545; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #fff8f8; border: 1px solid #dc3545; border-radius: 4px;';
                    heroForm.appendChild(failMsg);
                }
                failMsg.innerHTML = 'Sorry, there was an error sending your message. Please try again or call us directly at (949) 371-6423.';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                    if (failMsg) {
                        failMsg.remove();
                    }
                }, 5000);
            });
    });
    
    // Real-time validation for hero form
    const inputs = heroForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff5a33';
                this.style.boxShadow = '0 0 0 2px rgba(255, 90, 51, 0.2)';
            } else {
                this.style.borderColor = '#e5e5e5';
                this.style.boxShadow = 'none';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 90, 51)' && this.value.trim()) {
                this.style.borderColor = '#e5e5e5';
                this.style.boxShadow = 'none';
            }
        });
    });
}

// Initialize EmailJS forms
function initializeEmailJS() {
    // Wait for EmailJS config to load
    const checkForConfig = setInterval(() => {
        if (window.EMAILJS_CONFIG) {
            clearInterval(checkForConfig);
            setupEmailJSForm();
            setupHeroForm();
        }
    }, 100);
    
    // Fallback timeout
    setTimeout(() => {
        clearInterval(checkForConfig);
        setupEmailJSForm();
        setupHeroForm();
    }, 2000);
}

// Main initialization - single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize slideshow if present
    initializeSlideshow();
    
    // Initialize EmailJS forms only once
    if (!window.formsInitialized) {
        window.formsInitialized = true;
        initializeEmailJS();
    }
});