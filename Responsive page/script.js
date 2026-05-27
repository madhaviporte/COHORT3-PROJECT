document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Mobile menu toggle (simple version)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu clicked! In a full implementation, this would open a sidebar.');
        });
    }

    // Scroll reveal effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const announcementBar = document.querySelector('.announcement-bar');
    const scrollThreshold = announcementBar ? announcementBar.offsetHeight : 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('.hero-content > *, .quote-text, .section-badge, .discovery-header, .origins-content > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Pronounced parallax movement on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Target all major headings and components for the movement effect
        const movingElements = document.querySelectorAll('.quote-text, .discovery-title, .origins-title, .origins-desc, .origins-values, .reviews-header, .cafe-title');
        
        movingElements.forEach(el => {
            // Adjust speed for mobile for better performance and feel
            const isMobile = window.innerWidth <= 768;
            const speed = isMobile ? 0.08 : 0.15; // Slower on mobile
            
            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            
            // Calculate distance from center to determine shift
            const distanceFromCenter = elementCenter - viewportCenter;
            const shift = distanceFromCenter * speed;
            
            // Apply the floating movement
            el.style.transform = `translateY(${shift}px)`;
        });

        // Translate lattes badge vertically based on scroll position (no rotation)
        const lattesBadge = document.querySelector('.lattes-delicious-badge');
        if (lattesBadge) {
            const isMobile = window.innerWidth <= 768;
            const badgeSpeed = isMobile ? 0.08 : 0.15;
            
            const badgeRect = lattesBadge.getBoundingClientRect();
            const vpCenter = window.innerHeight / 2;
            const badgeCenter = badgeRect.top + badgeRect.height / 2;
            
            const badgeShift = (badgeCenter - vpCenter) * badgeSpeed;
            // Original translateY(-50%) must remain to keep it on border, then add shift
            lattesBadge.style.transform = `translateY(calc(-50% + ${badgeShift}px))`;
        }
    });
});
