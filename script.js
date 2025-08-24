document.addEventListener('DOMContentLoaded', () => {
    // This command finds all the icon placeholders and replaces them with the actual SVG icons.
    feather.replace();

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Smooth Scrolling for anchor links on the same page ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu on link click
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = document.getElementById('form-status');
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'text-blue-600 mt-4 text-center';

            // Check if Firebase is available before trying to use it
            if (window.db && window.addDoc && window.collection && window.serverTimestamp) {
                try {
                    await window.addDoc(window.collection(window.db, "contact_messages"), {
                        name: contactForm.name.value,
                        email: contactForm.email.value,
                        message: contactForm.message.value,
                        sentAt: window.serverTimestamp()
                    });

                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.className = 'text-green-600 mt-4 text-center';
                    contactForm.reset();
                } catch (error) {
                    console.error("Error sending message: ", error);
                    formStatus.textContent = 'Sorry, there was an error. Please try again.';
                    formStatus.className = 'text-red-600 mt-4 text-center';
                }
            } else {
                // Fallback for when Firebase isn't configured
                console.warn("Firebase is not configured. Simulating form submission.");
                setTimeout(() => {
                    formStatus.textContent = 'Thank you for your message!';
                    formStatus.className = 'text-green-600 mt-4 text-center';
                    contactForm.reset();
                }, 1500);
            }
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
    }

    // --- Initialize the Swiper Image Slider ---
    // This code looks for an element with the class "mySwiper" and turns it into a slider.
    var swiper = new Swiper(".mySwiper", {
        loop: true, // Loops back to the first slide after the last one
        autoplay: {
          delay: 3000, // Changes slide every 3 seconds
          disableOnInteraction: false, // Continues playing even after a user interacts with it
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
    });
});