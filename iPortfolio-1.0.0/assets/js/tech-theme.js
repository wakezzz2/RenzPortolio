document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state
  const navLinks = document.querySelectorAll('.nav-link-effect');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const header = document.querySelector('.header');
  const headerToggle = document.querySelector('.header-toggle');
  const navLinksMobile = document.querySelectorAll('.navmenu a');

  if (headerToggle) {
    headerToggle.addEventListener('click', () => {
      header.classList.toggle('header-active');
      document.body.classList.toggle('mobile-nav-active');
    });
  }

  // Close mobile menu when clicking nav links
  navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200) {
        header.classList.remove('header-active');
        document.body.classList.remove('mobile-nav-active');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 1200) {
      if (!header.contains(e.target) && !headerToggle.contains(e.target)) {
        header.classList.remove('header-active');
        document.body.classList.remove('mobile-nav-active');
      }
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        header.classList.remove('header-active');
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Tech dots animation
  const techDots = document.querySelectorAll('.tech-dot');
  let currentDot = 0;

  function animateDots() {
    techDots.forEach(dot => dot.classList.remove('active'));
    techDots[currentDot].classList.add('active');
    currentDot = (currentDot + 1) % techDots.length;
  }

  setInterval(animateDots, 1000);
  animateDots();
}); 