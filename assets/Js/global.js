// =============================================================================
// Arab Contractors - Main JavaScript File (Modular Version)
// =============================================================================

// #region Imports
import { initializeLanguageSettings, setLanguage } from './Lang.js';
import { toggleTheme, updateThemeIcon } from './Theme.js';
import { animateBrandName } from './Animations.js';
// #endregion

// #region Initialization
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const savedLang = localStorage.getItem('language') || 'en';

document.documentElement.setAttribute('data-theme', savedTheme);
document.documentElement.setAttribute('lang', savedLang);
document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
updateThemeIcon(savedTheme);

if (document.readyState !== 'loading') {
  initializeLanguageSettings(savedLang);
}
// #endregion

// #region Event Listeners
// Safe event listener attachment with null checks
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang');
    setLanguage(current === 'en' ? 'ar' : 'en');
  });
}

window.addEventListener('scroll', debounce(() => {
  const navbar = document.getElementById('mainNavbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
}, 10));

document.addEventListener('DOMContentLoaded', () => {
  initializeLanguageSettings(savedLang);
  ensureSpinnerHidden();
  setTimeout(() => animateBrandName(savedLang), 1000);
});

window.addEventListener('load', hideLoadingSpinner);
// #endregion

// #region Utilities
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

function getElement(id) {
  return document.getElementById(id);
}

function querySelector(selector) {
  return document.querySelector(selector);
}

function showLoadingSpinner() {
  const spinner = getElement('loadingSpinner');
  if (spinner) spinner.classList.remove('hidden');
}

function hideLoadingSpinner() {
  const spinner = getElement('loadingSpinner');
  if (spinner) {
    spinner.classList.add('hidden');
    setTimeout(() => spinner?.remove(), 500);
  }
}

function ensureSpinnerHidden() {
  setTimeout(hideLoadingSpinner, 5000);
}
// #endregion




AOS.init();




