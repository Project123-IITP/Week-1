document.addEventListener('DOMContentLoaded', () => {

  // 1. THEME CONTROLLER MATRIX
  const themeToggleBtn = document.getElementById('theme-toggle');
  const modeIcon = themeToggleBtn.querySelector('.mode-icon');
  
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    modeIcon.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    modeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 2. MOBILE DRAWER HAMBURGER TRANSITION
  const mobileMenuBtn =
document.getElementById("mobile-menu-btn");

const navLinksList =
document.getElementById("nav-links-list");

mobileMenuBtn.addEventListener("click",()=>{

mobileMenuBtn.classList.toggle("open");

navLinksList.classList.toggle("active");

});

document
.querySelectorAll(".nav-item")
.forEach(link=>{

link.addEventListener("click",()=>{

navLinksList.classList.remove("active");

mobileMenuBtn.classList.remove("open");

});

});

  // Close drawer on click target
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navLinksList.classList.remove('active');
    });
  });

  // 3. AUTO ACCENT NAV HIGHLIGHTER ON SCROLL
  const sections = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentActive = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        currentActive = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(currentActive)) {
        item.classList.add('active');
      }
    });
  });

  // 4. SCROLL REVEAL MOTION FOR TEXT AND CARDS
  const revealTargets = document.querySelectorAll(
    '.page-section h1, .page-section h2, .page-section h3, .page-section p, .page-section .section-tag, .page-section .btn, .page-section .metric-item, .page-section .service-card, .page-section .usp-item, .page-section .contact-cta-banner, .page-section .footer-column, .page-section .footer-logo-block, .page-section .dashboard-mockup, .page-section .about-main-image, .page-section .about-satisfaction-card'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    if (index % 3 === 1) element.classList.add('delay-1');
    if (index % 3 === 2) element.classList.add('delay-2');
    if (index % 5 === 4) element.classList.add('delay-3');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
      entry.target.classList.toggle('is-hidden', !entry.isIntersecting);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  });

  revealTargets.forEach((element) => revealObserver.observe(element));
});