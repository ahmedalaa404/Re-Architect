// animations.js

export function animateBrandName(lang) {
    const brandEl = document.getElementById('brandName');
    if (!brandEl) return;
  
    const text = brandEl.getAttribute('data-translate') === 'brand_name_ar'
      ? 'المقاولون العرب'
      : 'Arab Contractors';
  
    displayTextWithAnimation(brandEl, text);
  }
  
  export function initializeBrandNameDisplay(lang) {
    const brandEl = document.getElementById('brandName');
    if (!brandEl) return;
  
    const text = lang === 'ar' ? 'المقاولون العرب' : 'Arab Contractors';
    brandEl.textContent = text;
  }
  
  export function displayTextWithAnimation(element, text) {
    if (!element) return;
    element.textContent = '';
  
    let index = 0;
    const interval = setInterval(() => {
      element.textContent += text[index++];
      if (index >= text.length) clearInterval(interval);
    }, 100);
  }
  