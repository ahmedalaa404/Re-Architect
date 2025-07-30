// About Us Page Language Switching
document.addEventListener('DOMContentLoaded', function() {
  // Get the language toggle button
  const langToggle = document.getElementById('langToggle');
  
  // Function to switch language
  function switchLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    // Update document attributes
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    
    // Toggle content visibility
    const enTexts = document.querySelectorAll('.en-text');
    const arTexts = document.querySelectorAll('.ar-text');
    
    if (newLang === 'ar') {
      // Show Arabic, hide English
      enTexts.forEach(el => el.classList.add('d-none'));
      arTexts.forEach(el => el.classList.remove('d-none'));
    } else {
      // Show English, hide Arabic
      arTexts.forEach(el => el.classList.add('d-none'));
      enTexts.forEach(el => el.classList.remove('d-none'));
    }
    
    // Update Bootstrap RTL/LTR
    const cssLink = document.getElementById('bootstrap-css');
    if (cssLink) {
      cssLink.href = newLang === 'ar'
        ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
        : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    }
    
    // Save to localStorage
    localStorage.setItem('language', newLang);
  }
  
  // Add event listener to language toggle
  if (langToggle) {
    langToggle.addEventListener('click', switchLanguage);
  }
  
  // Initialize language on page load
  const savedLang = localStorage.getItem('language') || 'en';
  document.documentElement.setAttribute('lang', savedLang);
  document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
  
  // Set initial content visibility
  const enTexts = document.querySelectorAll('.en-text');
  const arTexts = document.querySelectorAll('.ar-text');
  
  if (savedLang === 'ar') {
    enTexts.forEach(el => el.classList.add('d-none'));
    arTexts.forEach(el => el.classList.remove('d-none'));
  } else {
    arTexts.forEach(el => el.classList.add('d-none'));
    enTexts.forEach(el => el.classList.remove('d-none'));
  }
  
  // Update Bootstrap CSS
  const cssLink = document.getElementById('bootstrap-css');
  if (cssLink) {
    cssLink.href = savedLang === 'ar'
      ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css'
      : 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  }
}); 