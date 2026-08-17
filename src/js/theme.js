/* Theme Manager Module */
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('pixelforge_theme') || 'dark';
    this.setTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pixelforge_theme', theme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
};

window.ThemeManager = ThemeManager;
