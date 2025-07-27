let translations = {};
fetch('assets/translations/translations.json')
  .then(response => response.json())
  .then(data => {
    translations = data;
    const savedLang = localStorage.getItem('language') || 'en';
    setAboutLanguage(savedLang);
    AOS.init({ duration: 1000, once: true, offset: 100 });
  })
  .catch(error => console.error('Error loading translations:', error));

// Set About Section Language
function setAboutLanguage(lang) {
  document.querySelectorAll('#about [data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translations[lang][key];
  });
  // Update button content with icon
  const readMoreBtn = document.querySelector('#about .btn-primary');
  if (readMoreBtn) {
    readMoreBtn.innerHTML = `${translations[lang].about_read_more} <i class="fas fa-arrow-right ms-2"></i>`;
  }
}

// Listen for language changes from global.js
window.addEventListener('languageChange', (event) => {
  setAboutLanguage(event.detail.lang);
});