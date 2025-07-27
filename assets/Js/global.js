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
setLanguage(savedLang);

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

// Set Language
function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
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
  animateArabicName(lang);
}

// Update Theme Icon
function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Animate Arabic Name
function animateArabicName(lang) {
  const arabicName = document.getElementById('animated-arabic-name');
  if (lang === 'ar' && arabicName) {
    arabicName.textContent = '';
    arabicName.style.opacity = 0;
    let index = 0;
    const text = translations[lang].brand_name_ar;
    const interval = setInterval(() => {
      arabicName.textContent = text.slice(0, ++index);
      arabicName.style.opacity = index / text.length;
      if (index === text.length) clearInterval(interval);
    }, 100);
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