document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initActiveNavigation();
    initScrollReveal();
});

/* ==========================================
   Theme Toggle
========================================== */
function initTheme() {
    const themeBtn = document.getElementById("theme-toggle");

    if (!themeBtn) return;

    const modeIcon = themeBtn.querySelector(".mode-icon");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        modeIcon.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        modeIcon.textContent = isLight ? "☀️" : "🌙";

        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

/* ==========================================
   Mobile Menu
========================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links-list");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-item").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.classList.remove("open");
        });
    });
}

/* ==========================================
   Active Navigation on Scroll
========================================== */
function initActiveNavigation() {
    const sections = document.querySelectorAll(".page-section");
    const navItems = document.querySelectorAll(".nav-item");

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 120) {
                currentSection = section.id;
            }
        });

        navItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.getAttribute("href") === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();
}

/* ==========================================
   Scroll Reveal Animation
========================================== */
function initScrollReveal() {

    const revealElements = document.querySelectorAll(`
        .page-section h1,
        .page-section h2,
        .page-section h3,
        .page-section p,
        .page-section .section-tag,
        .page-section .btn,
        .page-section .metric-item,
        .page-section .service-card,
        .page-section .usp-item,
        .page-section .contact-cta-banner,
        .page-section .footer-column,
        .page-section .footer-logo-block,
        .page-section .dashboard-mockup,
        .page-section .about-main-image,
        .page-section .about-satisfaction-card
    `);

    revealElements.forEach((element, index) => {

        element.classList.add("scroll-reveal");

        if (index % 3 === 1) {
            element.classList.add("delay-1");
        }

        if (index % 3 === 2) {
            element.classList.add("delay-2");
        }

        if (index % 5 === 4) {
            element.classList.add("delay-3");
        }

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                entry.target.classList.remove("is-hidden");
            } else {
                entry.target.classList.remove("is-visible");
                entry.target.classList.add("is-hidden");
            }

        });

    }, {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach(element => observer.observe(element));
}