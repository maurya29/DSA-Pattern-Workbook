(function () {
  const storageKey = 'dsa-theme';
  const saved = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'light');

  document.documentElement.dataset.theme = initialTheme;

  function syncButton(button) {
    const isDark = document.documentElement.dataset.theme === 'dark';
    button.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    button.setAttribute('aria-pressed', String(isDark));
  }

  window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;

    syncButton(button);
    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(storageKey, next);
      syncButton(button);
    });
  });
})();
