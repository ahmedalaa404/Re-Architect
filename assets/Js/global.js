// Initialize Theme
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Initialize Language
const translations = {
  en: {
    brand_name: "Arab Contractors",
    brand_name_ar: "Arab Contractors",
    nav: {
      home: "Home",
      about: "About",
      leadership: "Leadership",
      news: "News",
      hiring: "Hiring",
      sustainability: "Sustainability",
      privacy: "Privacy Policy",
      contact: "Contact",
      contact_us: "Contact Us",
      offices: "Offices"
    }
  },
  ar: {
    brand_name: "المقاولون العرب",
    brand_name_ar: "المقاولون العرب",
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      leadership: "القيادة",
      news: "الأخبار",
      hiring: "التوظيف",
      sustainability: "الاستدامة",
      privacy: "سياسة الخصوصية",
      contact: "اتصل بنا",
      contact_us: "اتصل بنا",
      offices: "المكاتب"
    }
  }
};

const savedLang = localStorage.getItem('language') || 'en';
// Set language without triggering animation immediately
setLanguageWithoutAnimation(savedLang);

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

// Language Toggle
document.getElementById('langToggle').addEventListener('click', () => {
  const currentLang = document.documentElement.getAttribute('lang');
  const newLang = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(newLang);
});

// Set Language without animation (for initial load)
function setLanguageWithoutAnimation(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    // Skip brand name elements - they will be handled by animation
    if (key === 'brand_name' || key === 'brand_name_ar') {
      return;
    }
    if (key.includes('.')) {
      const [namespace, subKey] = key.split('.');
      element.textContent = translations[lang][namespace][subKey];
    } else {
      element.textContent = translations[lang][key];
    }
  });
  document.getElementById('bootstrap-css').href = lang === 'ar' ?
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css' :
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  localStorage.setItem('language', lang);
}

// Set Language with animation (for user interactions)
function setLanguage(lang) {
  setLanguageWithoutAnimation(lang);
  animateArabicName(lang);
}

// Update Theme Icon
function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Letter-by-letter animation function
function animateText(element, text, speed = 100) {
  if (!element || !text) return;
  
  element.textContent = '';
  element.style.opacity = '1';
  
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
      // Add completion effect
      element.style.color = 'var(--primary-gold)';
      setTimeout(() => {
        element.style.color = 'var(--white)';
      }, 1000);
    }
  }, speed);
}

// Animate Brand Name
function animateArabicName(lang) {
  const englishElement = document.querySelector('.en-text[data-translate="brand_name"]');
  const arabicElement = document.getElementById('animated-arabic-name');
  
  if (lang === 'ar') {
    // Hide English, show Arabic
    if (englishElement) {
      englishElement.style.display = 'none';
    }
    if (arabicElement) {
      arabicElement.style.display = 'block';
      // Clear any existing text and animate
      arabicElement.textContent = '';
      setTimeout(() => {
        animateText(arabicElement, translations.ar.brand_name_ar, 80);
      }, 100);
    }
  } else {
    // Hide Arabic, show English
    if (arabicElement) {
      arabicElement.style.display = 'none';
    }
    if (englishElement) {
      englishElement.style.display = 'block';
      // Clear any existing text and animate
      englishElement.textContent = '';
      setTimeout(() => {
        animateText(englishElement, translations.en.brand_name, 100);
      }, 100);
    }
  }
}

// Initialize brand name display based on language
function initializeBrandNameDisplay(lang) {
  const englishElement = document.querySelector('.en-text[data-translate="brand_name"]');
  const arabicElement = document.getElementById('animated-arabic-name');
  
  if (lang === 'ar') {
    if (englishElement) englishElement.style.display = 'none';
    if (arabicElement) {
      arabicElement.style.display = 'block';
      arabicElement.textContent = translations.ar.brand_name_ar;
    }
  } else {
    if (arabicElement) arabicElement.style.display = 'none';
    if (englishElement) {
      englishElement.style.display = 'block';
      englishElement.textContent = translations.en.brand_name;
    }
  }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize brand name display first
  initializeBrandNameDisplay(savedLang);
  
  // Initial brand name animation after a delay
  setTimeout(() => {
    animateArabicName(savedLang);
  }, 1000);
});