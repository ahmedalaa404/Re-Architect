// theme.js

export function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }
  
  export function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
  
    if (theme === 'dark') {
      icon.classList.remove('sun');
      icon.classList.add('moon');
    } else {
      icon.classList.remove('moon');
      icon.classList.add('sun');
    }
  }
  