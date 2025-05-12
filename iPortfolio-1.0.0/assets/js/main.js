/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;

    // Initialize Isotope after images are loaded
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      // Add click event listeners to filter items
      isotopeItem.closest('.container').querySelectorAll('.isotope-filters li').forEach(function(filterEl) {
        filterEl.addEventListener('click', function() {
          isotopeItem.closest('.container').querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          
          // Get the filter value and arrange the items
          let filterValue = this.getAttribute('data-filter');
          console.log('Filter clicked:', filterValue);
          
          initIsotope.arrange({
            filter: filterValue
          });
          
          // Refresh AOS animations
          if (typeof aosInit === 'function') {
            aosInit();
          }
        });
      });
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');
  let currentSection = null;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const threshold = 0.3; // 30% of the section needs to be visible

    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    );
  }

  function updateActiveNavLink(sectionId) {
    if (currentSection === sectionId) return;
    currentSection = sectionId;
    
    navmenulinks.forEach(link => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function navmenuScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    let found = false;

    sections.forEach(section => {
      if (isElementInViewport(section)) {
        updateActiveNavLink(section.id);
        found = true;
      }
    });

    // If no section is in viewport, keep the last active section
    if (!found && currentSection) {
      const lastSection = document.getElementById(currentSection);
      if (lastSection && !isElementInViewport(lastSection)) {
        updateActiveNavLink(currentSection);
      }
    }
  }

  // Add click handler for navigation links
  navmenulinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      updateActiveNavLink(targetId);
    });
  });

  // Throttle scroll event for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        navmenuScrollspy();
        scrollTimeout = null;
      }, 100);
      }
  });

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Initialize particles.js
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Hero section particles
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#149ddd"
          },
          "shape": {
            "type": ["circle", "triangle", "edge", "polygon"],
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#149ddd",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
    
    // Add animation to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    portfolioItems.forEach((item, index) => {
      item.dataset.aos = "fade-up";
      item.dataset.aosDelay = (index * 100).toString();
    });
    
    // Enhance skill cards with animation
    const skillCards = document.querySelectorAll('.tech-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.tech-icon i');
        icon.style.transform = 'scale(1.2)';
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.tech-icon i');
        icon.style.transform = 'scale(1)';
      });
    });
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Add a small delay to ensure proper scrolling
          setTimeout(() => {
            const headerOffset = 100; // Increased offset to ensure section is fully visible
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
              top: offsetPosition,
            behavior: 'smooth'
          });
          }, 100);
        }
      });
    });
  });

  /**
   * Animate elements on scroll
   */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkInView() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < window.innerHeight * 0.8) {
        element.classList.add('animate__animated', element.dataset.animation);
      }
    });
  }
  
  window.addEventListener('scroll', checkInView);
  window.addEventListener('load', checkInView);

  /**
   * Initialize tech theme components
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Init custom theme animations and effects
    if (typeof initCircuitAnimations === 'function') initCircuitAnimations();
    if (typeof initTechCardEffects === 'function') initTechCardEffects();
    if (typeof initTerminalEffects === 'function') initTerminalEffects();
    if (typeof initDataVisuals === 'function') initDataVisuals();
    if (typeof initBinaryAnimation === 'function') initBinaryAnimation();
    if (typeof initMatrixCode === 'function') initMatrixCode();
    if (typeof initDarkModeToggle === 'function') initDarkModeToggle();
  });

  /**
   * Portfolio Filters Dropdown
   */
  document.addEventListener('DOMContentLoaded', function() {
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer) {
      const filterHeader = filterContainer.querySelector('.portfolio-filters-header');
      const filters = filterContainer.querySelectorAll('li');
      const headerText = filterHeader.querySelector('span');
      
      // Toggle dropdown
      filterHeader.addEventListener('click', function(e) {
        e.stopPropagation();
        filterContainer.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!filterContainer.contains(e.target)) {
          filterContainer.classList.remove('active');
        }
      });
      
      // Handle filter selection
      filters.forEach(filter => {
        filter.addEventListener('click', function() {
          // Update header text
          headerText.textContent = this.textContent;
          
          // Update active state
          filters.forEach(f => f.classList.remove('filter-active'));
          this.classList.add('filter-active');
          
          // Close dropdown
          filterContainer.classList.remove('active');
        });
      });
      
      // Initialize header text
      const activeFilter = filterContainer.querySelector('.filter-active');
      if (activeFilter) {
        headerText.textContent = activeFilter.textContent;
      }
    }
  });

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = document.querySelector('.isotope-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry'
      });

      let portfolioFilters = document.querySelectorAll('.portfolio-filters li');
      
      // Add click handlers to filter items
      portfolioFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Remove active class from all filters
          portfolioFilters.forEach(f => f.classList.remove('filter-active'));
          
          // Add active class to clicked filter
          filter.classList.add('filter-active');
          
          // Add fade-out class to all items
          document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
          });

          // Get the filter value
          let filterValue = filter.getAttribute('data-filter');
          
          // Arrange items after a short delay for animation
          setTimeout(() => {
            portfolioIsotope.arrange({
              filter: filterValue
            });
            
            // Add fade-in class to filtered items
            document.querySelectorAll('.portfolio-item' + (filterValue === '*' ? '' : filterValue)).forEach(item => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          }, 300);
        });
      });

      // Initial animation for all items
      document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.transition = 'all 0.4s ease-in-out';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      });
    }
  });

  // Responsive Portfolio Filters Dropdown (for <=600px)
  document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.portfolio-filters-dropdown');
    var toggle = document.querySelector('.portfolio-filters-toggle');
    var filters = document.querySelectorAll('.portfolio-filters li');
    if (dropdown && toggle) {
      // Toggle dropdown
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
      // Update button text and close dropdown on filter select
      filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
          toggle.querySelector('span').textContent = this.textContent;
          dropdown.classList.remove('active');
        });
      });
      // Set initial button text
      var active = dropdown.querySelector('.filter-active');
      if (active) {
        toggle.querySelector('span').textContent = active.textContent;
      }
    }
  });

})();