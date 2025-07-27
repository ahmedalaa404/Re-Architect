// =============================================================================
// Arab Contractors - Main JavaScript File
// Handles: Animations, Theme Toggle, Language Translation, Event Listeners
// =============================================================================

// #region Initialization
// =============================================================================
// Initialize theme and language on page load
// =============================================================================

// Get saved theme preference or default to system preference
const savedTheme = localStorage.getItem('theme') || 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Get saved language preference or default to English
const savedLang = localStorage.getItem('language') || 'en';

// Translation object containing all text in both languages
const translations = {
  en: {
    brand_name: "Arab Contractors",
    brand_name_ar: "Arab Contractors", // For consistency
    nav: {
      home: "Home",
      about: "About Us",
      leadership: "Leadership",
      news: "News",
      hiring: "Hiring",
      sustainability: "Sustainability",
      privacy: "Privacy Policy",
      contact: "Contact",
      contact_us: "Contact Us",
      offices: "Offices"
    },
    lang_toggle: "AR",
    home_description: "Welcome to Arab Contractors, your trusted partner for construction services.",
    footer_description: "Building the future with excellence, innovation, and sustainable development.",
    footer_quick_links: "Quick Links",
    footer_services: "Services",
    footer_service_infrastructure: "Infrastructure",
    footer_service_construction: "Construction",
    footer_service_engineering: "Engineering",
    footer_service_consulting: "Consulting",
    footer_contact: "Contact Information",
    footer_address: "Cairo, Egypt",
    footer_phone: "+20 2 1234 5678",
    footer_email: "info@arabcontractors.com",
    footer_copyright: "© 2025 Arab Contractors. All rights reserved."
  },
  ar: {
    brand_name: "المقاولون العرب",
    brand_name_ar: "المقاولون العرب",
    nav: {
      home: "الرئيسية",
      about: "عن الشركة",
      leadership: "القيادة",
      news: "الأخبار",
      hiring: "التوظيف",
      sustainability: "الاستدامة",
      privacy: "سياسة الخصوصية",
      contact: "اتصل بنا",
      contact_us: "اتصل بنا",
      offices: "المكاتب"
    },
    lang_toggle: "EN",
    home_description: "مرحبًا بكم في المقاولون العرب، شريككم الموثوق لخدمات البناء.",
    footer_description: "نبني المستقبل بالتميز والابتكار والتنمية المستدامة.",
    footer_quick_links: "روابط سريعة",
    footer_services: "الخدمات",
    footer_service_infrastructure: "البنية التحتية",
    footer_service_construction: "البناء",
    footer_service_engineering: "الهندسة",
    footer_service_consulting: "الاستشارات",
    footer_contact: "معلومات الاتصال",
    footer_address: "القاهرة، مصر",
    footer_phone: "+20 2 1234 5678",
    footer_email: "info@arabcontractors.com",
    footer_copyright: "© 2025 المقاولون العرب. جميع الحقوق محفوظة."
  }
};

// Apply initial theme and language settings
document.documentElement.setAttribute('data-theme', savedTheme);
document.documentElement.setAttribute('lang', savedLang);
document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');

// Update theme icon to match current theme
updateThemeIcon(savedTheme);

// Fallback initialization for immediate language setup
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded, initialize immediately
  setLanguageWithoutAnimation(savedLang);
  initializeBrandNameDisplay(savedLang);
  updateLanguageToggleButton(savedLang);
  
  // If page is already complete, hide spinner immediately
  if (document.readyState === 'complete') {
    hideLoadingSpinner();
  }
}

// #endregion

// #region Theme: Dark and Light Mode
// =============================================================================
// Theme management functions and variables
// =============================================================================

/**
 * Updates the theme icon based on current theme
 * @param {string} theme - 'light' or 'dark'
 */
function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

/**
 * Toggles between light and dark themes
 * Handles theme switching with proper icon updates
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Apply new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

// #endregion

// #region Language Translation
// =============================================================================
// Translation system and language management
// =============================================================================

// Translation object is now defined in the Initialization region above

/**
 * Sets language without triggering animations (for initial page load)
 * @param {string} lang - 'en' or 'ar'
 */
function setLanguageWithoutAnimation(lang) {
  console.log('Setting language without animation:', lang);
  // Update document attributes
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  // Update all translatable elements except brand names
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    
    // Skip brand name elements - handled by animation
    if (key === 'brand_name' || key === 'brand_name_ar') {
      return;
    }
    
    // Handle nested translation keys (e.g., 'nav.home')
    if (key.includes('.')) {
      const [namespace, subKey] = key.split('.');
      if (translations[lang][namespace] && translations[lang][namespace][subKey]) {
        element.textContent = translations[lang][namespace][subKey];
      }
    } else {
      // Handle simple translation keys
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    }
  });
  
  // Update Bootstrap CSS for RTL support
  const bootstrapCSS = document.getElementById('bootstrap-css');
  if (bootstrapCSS) {
    bootstrapCSS.href = lang === 'ar' ?
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css' :
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  }
  
  // Update language toggle button
  updateLanguageToggleButton(lang);
  
  // Save language preference
  localStorage.setItem('language', lang);
}

/**
 * Sets language with animation (for user interactions)
 * @param {string} lang - 'en' or 'ar'
 */
function setLanguage(lang) {
  console.log('Setting language to:', lang);
  setLanguageWithoutAnimation(lang);
  animateBrandName(lang);
}

/**
 * Initializes brand name display based on current language
 * Shows correct text immediately without animation
 * @param {string} lang - 'en' or 'ar'
 */
function initializeBrandNameDisplay(lang) {
  const englishElement = document.querySelector('.en-text[data-translate="brand_name"]');
  const arabicElement = document.getElementById('animated-arabic-name');
  
  if (lang === 'ar') {
    // Show Arabic, hide English
    if (englishElement) englishElement.style.display = 'none';
    if (arabicElement) {
      arabicElement.style.display = 'block';
      arabicElement.textContent = translations.ar.brand_name_ar;
    }
  } else {
    // Show English, hide Arabic
    if (arabicElement) arabicElement.style.display = 'none';
    if (englishElement) {
      englishElement.style.display = 'block';
      englishElement.textContent = translations.en.brand_name;
    }
  }
}

/**
 * Updates the language toggle button text based on current language
 * @param {string} lang - 'en' or 'ar'
 */
function updateLanguageToggleButton(lang) {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const enText = langToggle.querySelector('.en-text');
    const arText = langToggle.querySelector('.ar-text');
    
    if (lang === 'ar') {
      // Show "EN" button when current language is Arabic
      if (enText) enText.style.display = 'none';
      if (arText) arText.style.display = 'block';
    } else {
      // Show "AR" button when current language is English
      if (arText) arText.style.display = 'none';
      if (enText) enText.style.display = 'block';
    }
  }
}

// #endregion

// #region Animations
// =============================================================================
// Animation functions for brand name and other effects
// =============================================================================

/**
 * Animates text letter by letter with typing effect
 * @param {HTMLElement} element - Target element to animate
 * @param {string} text - Text to animate
 * @param {number} speed - Animation speed in milliseconds
 */
function animateText(element, text, speed = 100) {
  if (!element || !text) return;
  
  // Clear element and set initial state
  element.textContent = '';
  element.style.opacity = '1';
  
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      // Add next character
      element.textContent += text[index];
      index++;
    } else {
      // Animation complete
      clearInterval(interval);
      
      // Add completion effect (gold color flash)
      element.style.color = 'var(--primary-gold)';
      setTimeout(() => {
        element.style.color = 'var(--white)';
      }, 1000);
    }
  }, speed);
}

/**
 * Animates brand name based on current language
 * Handles switching between English and Arabic with smooth transitions
 * @param {string} lang - 'en' or 'ar'
 */
function animateBrandName(lang) {
  const englishElement = document.querySelector('.en-text[data-translate="brand_name"]');
  const arabicElement = document.getElementById('animated-arabic-name');
  
  if (lang === 'ar') {
    // Switch to Arabic animation
    if (englishElement) {
      englishElement.style.display = 'none';
    }
    if (arabicElement) {
      arabicElement.style.display = 'block';
      arabicElement.textContent = '';
      
      // Start animation after brief delay for smooth transition
      setTimeout(() => {
        animateText(arabicElement, translations.ar.brand_name_ar, 80);
      }, 100);
    }
  } else {
    // Switch to English animation
    if (arabicElement) {
      arabicElement.style.display = 'none';
    }
    if (englishElement) {
      englishElement.style.display = 'block';
      englishElement.textContent = '';
      
      // Start animation after brief delay for smooth transition
      setTimeout(() => {
        animateText(englishElement, translations.en.brand_name, 100);
      }, 100);
    }
  }
}

// #endregion

// #region Event Listeners
// =============================================================================
// Event listeners for user interactions
// =============================================================================

// Theme toggle event listener
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Language toggle event listener
document.getElementById('langToggle')?.addEventListener('click', () => {
  const currentLang = document.documentElement.getAttribute('lang');
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  console.log('Language toggle clicked:', currentLang, '->', newLang);
  setLanguage(newLang);
});

// Navbar scroll effect with debouncing for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  // Debounce scroll events for better performance
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, 10); // 10ms debounce
});

// Page load initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize language immediately for page load
  setLanguageWithoutAnimation(savedLang);
  
  // Initialize brand name display first (immediate)
  initializeBrandNameDisplay(savedLang);
  
  // Update language toggle button
  updateLanguageToggleButton(savedLang);
  
  // Ensure spinner is hidden with fallback timeout
  ensureSpinnerHidden();
  
  // Check if page is already complete
  if (document.readyState === 'complete') {
    hideLoadingSpinner();
  } else {
    // Wait for page to be fully loaded
    window.addEventListener('load', () => {
      hideLoadingSpinner();
    });
  }
  
  // Start animation after delay for better UX
  setTimeout(() => {
    animateBrandName(savedLang);
  }, 1000);
});

// Additional load event listener for cases where page loads very quickly
window.addEventListener('load', () => {
  // Hide spinner when page is fully loaded
  hideLoadingSpinner();
});

// #endregion

// #region Utilities
// =============================================================================
// Utility functions and helpers
// =============================================================================

/**
 * Checks if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Debounced function wrapper for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Debounce delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Safely gets element by ID with null check
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} Element or null if not found
 */
function getElement(id) {
  return document.getElementById(id);
}

/**
 * Safely queries selector with null check
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} Element or null if not found
 */
function querySelector(selector) {
  return document.querySelector(selector);
}

/**
 * Shows the loading spinner
 */
function showLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.remove('hidden');
  }
}

/**
 * Hides the loading spinner with smooth transition
 */
function hideLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.add('hidden');
    // Remove spinner from DOM after transition
    setTimeout(() => {
      if (spinner && spinner.parentNode) {
        spinner.parentNode.removeChild(spinner);
      }
    }, 500);
  }
}

/**
 * Ensures loading spinner is hidden with fallback timeout
 */
function ensureSpinnerHidden() {
  // Fallback: Hide spinner after maximum 5 seconds
  setTimeout(() => {
    hideLoadingSpinner();
  }, 5000);
}

// #endregion