import { translations } from './Translations.js';
import { animateBrandName, initializeBrandNameDisplay } from './Animations.js';

// Apply translations to DOM elements with data-translate attributes
export function applyLanguageToDOM(lang, section = null) {
  if (!translations[lang]) {
    console.error(`Language '${lang}' not found in translations.`);
    return;
  }

  // Scope query to a specific section if provided, otherwise query entire document
  const root = section || document;
  const elements = root.querySelectorAll('[data-translate]');

  elements.forEach(el => {
    const key = el.getAttribute('data-translate');
    // Skip brand_name and brand_name_ar as per original logic
    if (key === 'brand_name' || key === 'brand_name_ar') return;

    try {
      // Handle nested translation keys (e.g., sustainability.items.0.title)
      const val = key.includes('.')
        ? key.split('.').reduce((obj, i) => obj?.[i], translations[lang])
        : translations[lang][key];

      if (val !== undefined && val !== null) {
        el.textContent = val;
      } else {
        console.warn(`Translation missing for key '${key}' in language '${lang}'.`);
      }
    } catch (error) {
      console.error(`Error processing translation for key '${key}':`, error);
    }
  });
}

// Update Bootstrap CSS for LTR/RTL based on language
export function updateBootstrapCSS(lang) {
  const cssLink = document.getElementById('bootstrap-css');
  if (!cssLink) {
    console.warn('Bootstrap CSS link with id="bootstrap-css" not found.');
    return;
  }

  cssLink.href = lang === 'ar'
    ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
    : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
}

// Update language toggle button visibility
export function updateLanguageToggleButton(lang) {
  const toggle = document.getElementById('langToggle');
  if (!toggle) {
    console.warn('Language toggle button with id="langToggle" not found.');
    return;
  }

  const en = toggle.querySelector('.en-text');
  const ar = toggle.querySelector('.ar-text');

  if (lang === 'ar') {
    if (en) en.style.display = 'none';
    if (ar) ar.style.display = 'block';
  } else {
    if (ar) ar.style.display = 'none';
    if (en) en.style.display = 'block';
  }
}

// Initialize language settings
export function initializeLanguageSettings(lang) {
  if (!['en', 'ar'].includes(lang)) {
    console.error(`Unsupported language '${lang}'. Defaulting to 'en'.`);
    lang = 'en';
  }

  // Set document language and direction
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  applyLanguageToDOM(lang);
  updateBootstrapCSS(lang);
  updateLanguageToggleButton(lang);
  initializeBrandNameDisplay(lang);
}

// Set language and persist to localStorage
export function setLanguage(lang) {
  if (!['en', 'ar'].includes(lang)) {
    console.error(`Unsupported language '${lang}'. Defaulting to 'en'.`);
    lang = 'en';
  }

  initializeLanguageSettings(lang);
  animateBrandName(lang);
  localStorage.setItem('language', lang);
}