// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Slider functionality
const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

function nextSlide() {
    const current = document.querySelector('.slide.active');
    const next = current.nextElementSibling || slides[0];
    
    current.style.opacity = '0';
    next.style.opacity = '1';
    
    current.classList.remove('active');
    next.classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Add intersection observer for scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Animate elements when they come into view
document.querySelectorAll('.program-card, .vision-box, .mission-box').forEach(el => {
    animateOnScroll.observe(el);
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 1000);
});

// Scroll Progress Indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + '%';
});

// Smooth reveal animations for sections
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal-section');
    sectionObserver.observe(section);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add touch swipe support for hero slider
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.hero-slider');

slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide(); // Swipe left
    } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide(); // Swipe right
    }
}

// Add previous slide functionality
function prevSlide() {
    const current = document.querySelector('.slide.active');
    const prev = current.previousElementSibling || slides[slides.length - 1];
    
    current.style.opacity = '0';
    prev.style.opacity = '1';
    
    current.classList.remove('active');
    prev.classList.add('active');
}

// Enrollment Form Handling
const enrollmentForm = document.getElementById('enrollmentForm');

enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        studentName: document.getElementById('studentName').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        program: document.getElementById('program').value,
        parentName: document.getElementById('parentName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Add loading state to button
    const submitBtn = enrollmentForm.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Submitting...';
    submitBtn.disabled = true;
    
    // Format email content
    const emailContent = `
        New Enrollment Application
        
        Student Information:
        ------------------
        Name: ${formData.studentName}
        Date of Birth: ${formData.dob}
        Gender: ${formData.gender}
        Program: ${formData.program}
        
        Parent/Guardian Information:
        -------------------------
        Name: ${formData.parentName}
        Phone: ${formData.phone}
        Email: ${formData.email}
        
        Additional Information:
        --------------------
        ${formData.message}
        
        Submitted via: School Website
        Date: ${new Date().toLocaleString()}
    `;

    // Send email using EmailJS
    emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
            to_email: 'lawmwad@gmail.com',
            subject: 'New Enrollment Application - Brilliant Angels Junior School',
            message: emailContent,
            from_name: formData.studentName,
            reply_to: formData.email
        }
    ).then(
        function(response) {
            showNotification('Application submitted successfully! We will contact you soon.', 'success');
            enrollmentForm.reset();
            submitBtn.innerHTML = 'Submit Application';
            submitBtn.disabled = false;
        },
        function(error) {
            showNotification('Failed to submit application. Please try again.', 'error');
            submitBtn.innerHTML = 'Submit Application';
            submitBtn.disabled = false;
        }
    );
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Improved Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}); 