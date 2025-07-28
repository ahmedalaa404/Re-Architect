// lang.js

import { translations } from './Translations.js';
import { animateBrandName, initializeBrandNameDisplay } from './Animations.js';

export function applyLanguageToDOM(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (key === 'brand_name' || key === 'brand_name_ar') return;
    const val = key.includes('.')
      ? key.split('.').reduce((o, i) => o?.[i], translations[lang])
      : translations[lang][key];
    if (val) el.textContent = val;
  });
}

export function updateBootstrapCSS(lang) {
  const cssLink = document.getElementById('bootstrap-css');
  if (cssLink) {
    cssLink.href = lang === 'ar'
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  }
}

export function updateLanguageToggleButton(lang) {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;
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

export function initializeLanguageSettings(lang) {
  applyLanguageToDOM(lang);
  updateBootstrapCSS(lang);
  updateLanguageToggleButton(lang);
  initializeBrandNameDisplay(lang);

}

export function setLanguage(lang) {
  initializeLanguageSettings(lang);
  animateBrandName(lang);
  localStorage.setItem('language', lang);
}

