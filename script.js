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

// EmailJS Integration and Form handling
function setupEmailJSForm() {
    console.log('Setting up EmailJS form...');
    console.log('EmailJS available:', typeof emailjs !== 'undefined');
    console.log('EMAILJS_CONFIG:', window.EMAILJS_CONFIG);
    
    const contactForm = document.getElementById('contact-form');
    console.log('Contact form found:', !!contactForm);
    
    if (!contactForm) {
        console.log('Contact form not found, retrying in 100ms...');
        setTimeout(setupEmailJSForm, 100);
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

// Initialize form when DOM is ready or call directly - only on contact page
if (window.location.pathname.includes('contact.html') || window.location.pathname === '/contact.html') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEmailJSForm);
    } else {
        setupEmailJSForm();
    }
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            
            this.value = value;
        });
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and other animated elements
    const animatedElements = document.querySelectorAll('.service-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Button hover enhancement
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn--primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});