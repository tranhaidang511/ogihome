let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Auto slideshow
function autoSlideshow() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
}

// Show specific slide
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Change slide manually
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

// Go to specific slide
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Touch/Swipe functionality for slideshow
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleSwipeGesture() {
    const minSwipeDistance = 50; // Minimum distance for a swipe
    const maxVerticalDistance = 100; // Maximum vertical movement to still count as horizontal swipe
    
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Check if it's a horizontal swipe with minimal vertical movement
    if (Math.abs(horizontalDistance) > minSwipeDistance && verticalDistance < maxVerticalDistance) {
        if (horizontalDistance > 0) {
            // Swipe right - go to previous slide
            changeSlide(-1);
        } else {
            // Swipe left - go to next slide
            changeSlide(1);
        }
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const heroSection = document.querySelector('.hero');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = document.querySelector('nav').contains(event.target);
        
        if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Add touch event listeners for swipe functionality
    if (heroSection) {
        heroSection.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        heroSection.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        });
        
        // Prevent scrolling when swiping on the hero section
        heroSection.addEventListener('touchmove', function(e) {
            const touch = e.touches[0];
            const horizontalMovement = Math.abs(touch.screenX - touchStartX);
            const verticalMovement = Math.abs(touch.screenY - touchStartY);
            
            // If horizontal movement is greater than vertical, prevent default scrolling
            if (horizontalMovement > verticalMovement) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

// Language switching function
function switchLanguage(lang) {
    // Save language preference
    localStorage.setItem('ogiHomeLang', lang);
    
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/');
    const currentLang = pathSegments[pathSegments.length - 2] || 'root';
    
    // Don't redirect if already on the correct language
    if (currentLang === lang) return;
    
    switch(lang) {
        case 'ja':
            window.location.href = '../ja/';
            break;
        case 'vi':
            window.location.href = '../vi/';
            break;
        default:
            window.location.href = '../en/';
    }
}

// Start auto slideshow
setInterval(autoSlideshow, 5000); // Change slide every 5 seconds