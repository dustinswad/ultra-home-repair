// HandyCamNY Clone - Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
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
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
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
});

// Portfolio Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const nextBtn = document.querySelector('.slide-nav.next');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return; // Not on portfolio page
    
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Update slide counter
        const currentSlideSpan = document.getElementById('current-slide');
        const totalSlidesSpan = document.getElementById('total-slides');
        if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;
        if (totalSlidesSpan) totalSlidesSpan.textContent = slides.length;
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshowContainer = document.querySelector('.portfolio-slideshow');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left = next slide
            } else {
                prevSlide(); // Swipe right = previous slide
            }
        }
    }
    
    // Auto-advance slideshow (optional, commented out)
    // setInterval(nextSlide, 8000);
    
    // Initialize first slide
    showSlide(0);
});

// EmailJS Integration and Form handling
function setupEmailJSForm() {
    console.log('Setting up EmailJS form...');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('EMAILJS_CONFIG:', window.EMAILJS_CONFIG);
    
    const contactForm = document.getElementById('contact-form');
    console.log('Contact form found:', !!contactForm);
    
    if (!contactForm) {
        console.log('Contact form not found on this page');
        return;
    }
    
    if (contactForm) {
        // Add form submission handling with EmailJS
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submitted!');
            e.preventDefault();
            
            // Check if EmailJS is available and config is loaded
            if (!window.EMAILJS_CONFIG || typeof emailjs === 'undefined' || !window.EMAILJS_CONFIG.publicKey) {
                console.error('EmailJS not available or config not loaded, falling back to mailto');
                // Fallback to mailto
                const formData = new FormData(contactForm);
                const params = new URLSearchParams();
                for (let [key, value] of formData.entries()) {
                    params.append(key, value);
                }
                const emailBody = `Name: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0APhone: ${formData.get('phone')}%0D%0AAddress: ${formData.get('address')}%0D%0ATimeline: ${formData.get('timeline')}%0D%0A%0D%0AMessage:%0D%0A${formData.get('message')}`;
                // Email fallback removed - form will only work with EmailJS
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
                // Create and show error message
                let errorMsg = contactForm.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #ff5a33; text-align: center; margin-top: 1rem; font-weight: 600;';
                    contactForm.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Please fill in all required fields.';
                
                // Scroll to first error
                const firstError = contactForm.querySelector('[required][style*="border-color: rgb(255, 90, 51)"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return false;
            }
            
            // Remove any error messages
            const errorMsg = contactForm.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('.btn--primary');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Prepare template parameters to match EmailJS template variables
            const templateParams = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                address: contactForm.address.value,
                message: contactForm.message.value,
                timeline: contactForm.timeline.value
            };
            
            // Double-check EmailJS config before sending
            if (!window.EMAILJS_CONFIG || !window.EMAILJS_CONFIG.serviceId || !window.EMAILJS_CONFIG.templateId) {
                console.error('EmailJS config incomplete, cannot send email');
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Configuration Error';
                submitButton.style.backgroundColor = '#dc3545';
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.backgroundColor = '';
                    submitButton.disabled = false;
                }, 3000);
                return;
            }
            
            // Send email via EmailJS
            emailjs.send(window.EMAILJS_CONFIG.serviceId, window.EMAILJS_CONFIG.templateId, templateParams)
                .then(function(response) {
                    // Success
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitButton.style.backgroundColor = '#28a745';
                    
                    // Show success message
                    let successMsg = contactForm.querySelector('.success-message');
                    if (!successMsg) {
                        successMsg = document.createElement('div');
                        successMsg.className = 'success-message';
                        successMsg.style.cssText = 'color: #28a745; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #f8fff8; border: 1px solid #28a745; border-radius: 4px;';
                        contactForm.appendChild(successMsg);
                    }
                    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
                    
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
                    submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
                    submitButton.style.backgroundColor = '#dc3545';
                    
                    // Show error message
                    let failMsg = contactForm.querySelector('.fail-message');
                    if (!failMsg) {
                        failMsg = document.createElement('div');
                        failMsg.className = 'fail-message';
                        failMsg.style.cssText = 'color: #dc3545; text-align: center; margin-top: 1rem; font-weight: 600; padding: 1rem; background: #fff8f8; border: 1px solid #dc3545; border-radius: 4px;';
                        contactForm.appendChild(failMsg);
                    }
                    failMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error sending your message. Please try again or call us directly at (949) 371-6423.';
                    
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
}

// Hero form setup for homepage
function setupHeroForm() {
    console.log('Setting up Hero form...');
    
    const heroForm = document.getElementById('hero-contact-form');
    console.log('Hero form found:', !!heroForm);
    
    if (!heroForm) {
        console.log('Hero form not found on this page');
        return;
    }
    
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            console.log('Hero form submitted!');
            e.preventDefault();
            
            // Check if EmailJS is available and config is loaded
            if (!window.EMAILJS_CONFIG || typeof emailjs === 'undefined' || !window.EMAILJS_CONFIG.publicKey) {
                console.error('EmailJS not available or config not loaded, falling back to alert');
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
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation and slideshow
    initializeNavigation();
    initializeSlideshow();
    
    // Initialize EmailJS forms only once
    if (!window.formsInitialized) {
        window.formsInitialized = true;
        initializeEmailJS();
    }
});

// Function to check for EmailJS config and initialize forms
function initializeEmailJS() {
    const checkForConfig = setInterval(() => {
        if (window.EMAILJS_CONFIG) {
            clearInterval(checkForConfig);
            setupEmailJSForm();
            setupHeroForm();
        }
    }, 100);
    
    // Fallback timeout in case config doesn't load
    setTimeout(() => {
        clearInterval(checkForConfig);
        setupEmailJSForm();
        setupHeroForm();
    }, 2000);
}