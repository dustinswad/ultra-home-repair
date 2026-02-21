// Ultra Home Repair - Main JavaScript File

// Global variables
let currentSlide = 0;
let totalSlides = 0;

// Hamburger menu initialization
function initializeHamburgerMenu() {
    const btn = document.getElementById('nav-toggle') || document.querySelector('.nav-toggle');
    if (!btn) return;

    // Replace icon content with animated bars if not already present
    if (!btn.querySelector('.bar')) {
        btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        btn.setAttribute('aria-label', 'Open menu');
        btn.setAttribute('aria-controls', 'mobile-menu');
        btn.setAttribute('aria-expanded', 'false');
    }

    // Create backdrop if missing
    let backdrop = document.getElementById('menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'menu-backdrop';
        backdrop.className = 'menu-backdrop';
        backdrop.hidden = true;
        document.body.appendChild(backdrop);
    }

    // Create off-canvas panel if missing
    let panel = document.getElementById('mobile-menu');
    if (!panel) {
        panel = document.createElement('nav');
        panel.id = 'mobile-menu';
        panel.className = 'mobile-menu';
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML = '<div class="menu-title">Menu</div><div class="links"></div>';
        document.body.appendChild(panel);
    }

    // Populate links from desktop nav
    const linksBox = panel.querySelector('.links');
    const srcList = document.querySelector('.nav-list');
    if (srcList && linksBox && !linksBox.children.length) {
        const items = Array.from(srcList.querySelectorAll('a'));
        linksBox.innerHTML = items.map(a => '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>').join('');
    }

    function openMenu() {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        backdrop.hidden = false;
        backdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
        const first = panel.querySelector('a');
        if (first) first.focus();
    }

    function closeMenu() {
        btn.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('open');
        setTimeout(function() { backdrop.hidden = true; }, 200);
        document.body.style.overflow = '';
        btn.focus();
    }

    btn.addEventListener('click', function() {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? closeMenu() : openMenu();
    });

    backdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            closeMenu();
        }
    });

    panel.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', closeMenu);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                var header = document.querySelector('.header');
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = targetElement.offsetTop - headerHeight;

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

    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.style.display = index === n ? 'flex' : 'none';
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });
        if (slideCounter) {
            slideCounter.textContent = (n + 1) + ' / ' + totalSlides;
        }
        currentSlide = n;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    document.addEventListener('keydown', function(e) {
        if (slides.length > 0) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        }
    });

    // Touch/swipe support
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
                diff > 0 ? nextSlide() : prevSlide();
            }
        });
    }

    showSlide(0);
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeHamburgerMenu();
    initializeSmoothScroll();
    initializeSlideshow();
});
