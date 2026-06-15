/* ==========================================================================
   Sakthi Shanmugam - Chartered Engineer Website JavaScript File
   ========================================================================== */

// 1. Immediate Theme Detection (Runs immediately to prevent theme flash)
(function() {
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 2. Light / Dark Theme Button Bindings
    // ==========================================
    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    updateToggleIcons(currentTheme);

    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleIcons(newTheme);
        });
    });

    function updateToggleIcons(theme) {
        themeToggleButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'fa-solid fa-sun';
                } else {
                    icon.className = 'fa-solid fa-moon';
                }
            }
        });
    }

    // ==========================================
    // 3. Sticky Navigation Header
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // ==========================================
    // 4. Mobile Menu Drawer Toggle
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const drawerClose = document.querySelector('.drawer-close');
    const navDrawer = document.querySelector('.mobile-nav-drawer');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openDrawer() {
        if (navDrawer && drawerBackdrop) {
            navDrawer.classList.add('open');
            drawerBackdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeDrawer() {
        if (navDrawer && drawerBackdrop) {
            navDrawer.classList.remove('open');
            drawerBackdrop.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // ==========================================
    // 5. Gallery Dynamically Filter Items
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Change active button style
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        // Add fade-in animation
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 6. Interactive Lightbox Modal for Gallery
    // ==========================================
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightboxModal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgUrl = item.querySelector('img').src;
                const imgTitle = item.querySelector('.gallery-title').textContent;
                const imgCategory = item.querySelector('.gallery-category').textContent;

                if (lightboxImage && lightboxCaption) {
                    lightboxImage.src = imgUrl;
                    lightboxCaption.textContent = `${imgTitle} - ${imgCategory}`;
                }
                
                lightboxModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightboxModal.classList.remove('open');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                if (lightboxImage) lightboxImage.src = '';
            }, 300);
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // ==========================================
    // 7. Contact Form Validation & Submission
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear any previous response messages
            const existingMsg = document.querySelector('.form-response-msg');
            if (existingMsg) existingMsg.remove();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^[0-9+\s\-()]{10,15}$/;

            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = '#ef4444';
            } else {
                nameInput.style.borderColor = 'var(--color-border)';
            }

            if (!emailRegex.test(emailInput.value.trim())) {
                isValid = false;
                emailInput.style.borderColor = '#ef4444';
            } else {
                emailInput.style.borderColor = 'var(--color-border)';
            }

            if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                isValid = false;
                phoneInput.style.borderColor = '#ef4444';
            } else {
                phoneInput.style.borderColor = 'var(--color-border)';
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = '#ef4444';
            } else {
                messageInput.style.borderColor = 'var(--color-border)';
            }

            const responseContainer = document.createElement('div');
            responseContainer.className = 'form-response-msg';
            responseContainer.style.marginTop = '20px';
            responseContainer.style.padding = '14px 20px';
            responseContainer.style.borderRadius = 'var(--radius-sm)';
            responseContainer.style.fontWeight = '600';
            responseContainer.style.fontSize = '0.95rem';

            if (isValid) {
                responseContainer.style.backgroundColor = '#d1fae5';
                responseContainer.style.color = '#065f46';
                responseContainer.style.border = '1px solid #34d399';
                responseContainer.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We will get back to you shortly.';
                contactForm.reset();
            } else {
                responseContainer.style.backgroundColor = '#fee2e2';
                responseContainer.style.color = '#991b1b';
                responseContainer.style.border = '1px solid #f87171';
                responseContainer.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields correctly before submitting.';
            }

            contactForm.appendChild(responseContainer);
        });
    }

    // ==========================================
    // 8. Scroll Reveal Animation Observer
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ==========================================
    // 9. Stats Counter Animation (Animated Number Counting)
    // ==========================================
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statsSection && statNumbers.length > 0) {
        let countStarted = false;
        
        const countUp = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'), 10);
                const targetStr = stat.getAttribute('data-target');
                const hasPercent = targetStr === '100';
                const hasPlus = targetStr !== '100';
                const hasComma = targetStr === '1200';
                
                const duration = 2000; // 2 seconds
                const frameRate = 1000 / 60; // 60 fps
                const totalFrames = Math.round(duration / frameRate);
                let frame = 0;
                
                const timer = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentVal = Math.floor(easeProgress * target);
                    
                    let formattedVal = currentVal;
                    if (hasComma && currentVal >= 1000) {
                        formattedVal = currentVal.toLocaleString('en-IN');
                    }
                    
                    if (hasPercent) {
                        stat.textContent = formattedVal + '%';
                    } else if (hasPlus) {
                        stat.textContent = formattedVal + '+';
                    } else {
                        stat.textContent = formattedVal;
                    }
                    
                    if (frame === totalFrames) {
                        clearInterval(timer);
                        // Ensure final value matches target format
                        let finalFormatted = target;
                        if (hasComma) {
                            finalFormatted = target.toLocaleString('en-IN');
                        }
                        if (hasPercent) {
                            stat.textContent = finalFormatted + '%';
                        } else if (hasPlus) {
                            stat.textContent = finalFormatted + '+';
                        } else {
                            stat.textContent = finalFormatted;
                        }
                    }
                }, frameRate);
            });
        };
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countStarted) {
                    countStarted = true;
                    countUp();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        counterObserver.observe(statsSection);
    }

    // ==========================================
    // 10. FAQ Accordion Toggle
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const faqAnswer = faqItem.querySelector('.faq-answer');
                
                // Toggle active class on item
                const isActive = faqItem.classList.contains('active');
                
                // Close all other items (standard accordion behavior)
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) {
                        answer.style.maxHeight = null;
                    }
                });
                
                if (!isActive) {
                    faqItem.classList.add('active');
                    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                }
            });
        });
    }

});
