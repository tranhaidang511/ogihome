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
            window.location.href = '../ja/index.html';
            break;
        case 'vi':
            window.location.href = '../vi/index.html';
            break;
        default:
            window.location.href = '../en/index.html';
    }
}

// Start auto slideshow
setInterval(autoSlideshow, 5000); // Change slide every 5 seconds