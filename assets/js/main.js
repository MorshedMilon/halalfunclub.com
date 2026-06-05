/* Main Shared Scripts for Halal Fun Club */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Header scroll effect
  const header = document.querySelector('.main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger initially in case of refreshed pages

  // 2. Hamburger Mobile Drawer Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      // Prevent body scrolling when mobile menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Dynamic Footer Copyright Year
  const copyrightYearSpan = document.getElementById('copyright-year');
  if (copyrightYearSpan) {
    copyrightYearSpan.textContent = new Date().getFullYear();
  }

  // 4. Scroll Reveal Animations (Intersection Observer)
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(reveal => {
      reveal.classList.add('active');
    });
  }
});
