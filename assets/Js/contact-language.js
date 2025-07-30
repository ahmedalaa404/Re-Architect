// =============================================================================
// Contact Page Language Switching JavaScript
// =============================================================================

class ContactLanguageManager {
  constructor() {
    this.currentLanguage = document.documentElement.getAttribute('lang') || 'en';
    this.init();
  }

  init() {
    this.updateLanguageDisplay();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for language changes from the main language system
    document.addEventListener('languageChanged', () => {
      this.currentLanguage = document.documentElement.getAttribute('lang');
      this.updateLanguageDisplay();
    });

    // Also listen for manual language toggle clicks
    document.addEventListener('click', (e) => {
      if (e.target.closest('#langToggle')) {
        setTimeout(() => {
          this.currentLanguage = document.documentElement.getAttribute('lang');
          this.updateLanguageDisplay();
        }, 100);
      }
    });
  }

  updateLanguageDisplay() {
    const isArabic = this.currentLanguage === 'ar';
    
    // Update all English text elements
    const englishElements = document.querySelectorAll('.text-en');
    englishElements.forEach(element => {
      if (isArabic) {
        element.classList.remove('d-block');
        element.classList.add('d-none');
      } else {
        element.classList.remove('d-none');
        element.classList.add('d-block');
      }
    });

    // Update all Arabic text elements
    const arabicElements = document.querySelectorAll('.text-ar');
    arabicElements.forEach(element => {
      if (isArabic) {
        element.classList.remove('d-none');
        element.classList.add('d-block');
      } else {
        element.classList.remove('d-block');
        element.classList.add('d-none');
      }
    });

    // Update document direction
    document.documentElement.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
  }

  // Public method to manually switch language
  switchLanguage(lang) {
    this.currentLanguage = lang;
    document.documentElement.setAttribute('lang', lang);
    this.updateLanguageDisplay();
  }

  // Public method to get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the contact page
  const contactPage = document.querySelector('.contact-hero');
  
  if (contactPage) {
    window.contactLanguageManager = new ContactLanguageManager();
  }
});

// Export for manual initialization
export function initializeContactLanguage() {
  return new ContactLanguageManager();
}

// Utility functions for manual language switching
export function switchToEnglish() {
  if (window.contactLanguageManager) {
    window.contactLanguageManager.switchLanguage('en');
  }
}

export function switchToArabic() {
  if (window.contactLanguageManager) {
    window.contactLanguageManager.switchLanguage('ar');
  }
} 