/* --- Navigation Menu --- */
const navMenu = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
}));

/* --- Sticky Header --- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

/* --- Scroll Top Button --- */
const scrollTop = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
});
scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- Active Link highlighting on Scroll --- */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav-list a[href*=' + sectionId + ']');
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

/* --- Animated Counters --- */
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentCounter = entry.target;
            const target = +currentCounter.getAttribute('data-target');
            
            const updateCount = () => {
                const count = +currentCounter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    currentCounter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    currentCounter.innerText = target;
                }
            };
            
            updateCount();
            observer.unobserve(currentCounter);
        }
    });
};

const counterObserver = new IntersectionObserver(startCounters, {
    threshold: 0.5
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

/* --- Scroll Reveal Animations --- */
const revealElements = document.querySelectorAll('.section-title, .about-data, .about-image, .service-card, .gallery-item, .testimonial-card, .contact-info, .contact-form');

revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealOnScroll, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

/* --- Gallery Filtering --- */
const filterBtns = document.querySelectorAll('.filter-item');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('hide');
                // Small trick to re-trigger layout for animation
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* --- Gallery Lightbox --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        const itemImgSrc = overlay.previousElementSibling.getAttribute('src');
        lightboxImg.setAttribute('src', itemImgSrc);
        lightbox.classList.add('active');
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Close lightbox on clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
    }
});

/* --- Vanilla Tilt Configuration --- */
VanillaTilt.init(document.querySelectorAll(".service-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

/* --- Form Submit Dummy --- */
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formMessage.style.display = 'block';
        formMessage.style.color = 'var(--color-green-dark)';
        formMessage.innerText = 'Thank you! Your request has been sent.';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}
