"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // TinySlider initialization
    var slider = tns({
        container: '.my-slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayButtonOutput: false,
        nav: false,
        controls: false,
        mouseDrag: true,
        swipeAngle: false,
        speed: 600
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

    // Navbar shrink effect
    window.onscroll = function () {
        const navbar = document.querySelector('.navbar');
        const sticky = navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };

    // Testimonial carousel functionality
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function updateTestimonialButtons() {
        const nextBtn = document.querySelector('.next-testimonial');
        const prevBtn = document.querySelector('.prev-testimonial');

        if (nextBtn && prevBtn) {
            nextBtn.disabled = currentTestimonial === testimonials.length - 1;
            prevBtn.disabled = currentTestimonial === 0;
        }
    }

    // Add event listeners if buttons exist
    const nextBtn = document.querySelector('.next-testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
            updateTestimonialButtons();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
            updateTestimonialButtons();
        });
    }

    // Initialize the first testimonial and update buttons
    showTestimonial(currentTestimonial);
    updateTestimonialButtons();

    // Form submission handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch('/send-message', {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset(); // Reset the form
                } else {
                    alert('There was an error sending your message.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message.');
            });
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);

    // Scroll to top button functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });

    // Enhanced accessibility for scroll to top button
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.zIndex = '1000';
    scrollToTopBtn.style.padding = '10px';
    scrollToTopBtn.style.fontSize = '20px';
    scrollToTopBtn.style.backgroundColor = '#007bff';
    scrollToTopBtn.style.color = '#fff';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '5px';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';

    // Fade-in effect for scroll to top button
    const fadeInOut = () => {
        scrollToTopBtn.style.opacity = '0';
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.1;
                scrollToTopBtn.style.opacity = opacity;
            } else {
                clearInterval(fadeIn);
            }
        }, 50);
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
            fadeInOut();
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Event listener for window resize to adjust navbar
    window.addEventListener('resize', () => {
        const navbar = document.querySelector('.navbar');
        if (window.innerWidth < 768) {
            navbar.classList.remove('sticky'); // Remove sticky class on small screens
        }
    });

    // Keyboard accessibility for navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            if (nextBtn) nextBtn.click();
        } else if (event.key === 'ArrowLeft') {
            if (prevBtn) prevBtn.click();
        }
    });
    $(document).ready(function () {
        // Handle click on portfolio view details button
        $('.view-details').on('click', function () {
            const title = $(this).data('title');
            const description = $(this).data('description');
            const image = $(this).data('image');
    
            // Set the modal content
            $('#portfolioModalLabel').text(title);
            $('#portfolioDescription').text(description);
            $('#portfolioImage').attr('src', image);
    
            // Show the modal
            $('#portfolioModal').modal('show');
        });
    
        // Handle click on blog read more button
        $('.read-more').on('click', function () {
            const title = $(this).data('title');
            const content = $(this).data('content');
    
            // Set the modal content
            $('#blogModalLabel').text(title);
            $('#blogContent').text(content);
    
            // Show the modal
            $('#blogModal').modal('show');
        });
    });
    

});
