// Modern JS for JCS Homes LLC website

// Debounce function to limit how often a function can run
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Dark mode functionality
function initDarkMode() {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  document.body.appendChild(darkModeToggle);
  
  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  // Toggle theme
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light';
    
    if (!currentTheme || currentTheme === 'light') {
      targetTheme = 'dark';
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
  
  // Listen for OS theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
  });
}

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

const handleScroll = debounce(() => {
  // Back to top button visibility
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('active');
  } else {
    backToTopButton.classList.remove('active');
  }
  
  // Header fixed class
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    if (!header.classList.contains('fixed-top')) {
      header.classList.add('fixed-top');
    }
  } else {
    if (header.classList.contains('fixed-top')) {
      header.classList.remove('fixed-top');
    }
  }
}, 5);

window.addEventListener('scroll', handleScroll);

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for navigation links with improved performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      // Use requestAnimationFrame for smoother scrolling
      const scrollToTarget = () => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      };
      
      requestAnimationFrame(scrollToTarget);
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler').click();
      }
    }
  });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('displayYear').textContent = new Date().getFullYear();
  
  // Initialize dark mode
  initDarkMode();
  
  // Initialize AOS with optimized settings
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }
});