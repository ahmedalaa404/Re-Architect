// animations.js

export function animateBrandName(lang) {
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
        displayTextWithAnimation(arabicElement, 'المقاولون العرب', 80);
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
        displayTextWithAnimation(englishElement, 'Arab Contractors', 100);
      }, 100);
    }
  }
}

export function initializeBrandNameDisplay(lang) {
  const englishElement = document.querySelector('.en-text[data-translate="brand_name"]');
  const arabicElement = document.getElementById('animated-arabic-name');
  
  if (lang === 'ar') {
    // Show Arabic, hide English
    if (englishElement) englishElement.style.display = 'none';
    if (arabicElement) {
      arabicElement.style.display = 'block';
      arabicElement.textContent = 'المقاولون العرب';
    }
  } else {
    // Show English, hide Arabic
    if (arabicElement) arabicElement.style.display = 'none';
    if (englishElement) {
      englishElement.style.display = 'block';
      englishElement.textContent = 'Arab Contractors';
    }
  }
}

export function displayTextWithAnimation(element, text, speed = 100) {
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
  