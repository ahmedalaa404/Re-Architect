// =============================================================================
// News Filters JavaScript
// =============================================================================

class NewsFilters {
  constructor() {
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.setupFilterButtons();
    this.setupEventListeners();
  }

  setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = button.getAttribute('data-filter');
        this.filterNews(filter);
        this.updateActiveButton(button);
      });
    });
  }

  setupEventListeners() {
    // Listen for language changes to update filter button text
    document.addEventListener('languageChanged', () => {
      // Filter buttons will automatically update due to the text-en/text-ar classes
    });
  }

  filterNews(filter) {
    this.currentFilter = filter;
    const newsCards = document.querySelectorAll('[data-category]');
    
    newsCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        // Show the card with animation
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        // Hide the card with animation
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Reinitialize AOS for visible cards
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 400);
  }

  updateActiveButton(activeButton) {
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
  }

  // Public method to get current filter
  getCurrentFilter() {
    return this.currentFilter;
  }

  // Public method to reset to all news
  showAllNews() {
    this.filterNews('all');
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) {
      this.updateActiveButton(allButton);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const newsFilters = document.querySelector('.news-filters');
  if (newsFilters) {
    window.newsFilters = new NewsFilters();
  }
});

// Export for manual initialization
export function initializeNewsFilters() {
  return new NewsFilters();
} 