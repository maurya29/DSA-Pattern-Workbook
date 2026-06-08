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

    if (button) {
      syncButton(button);
      button.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem(storageKey, next);
        syncButton(button);
      });
    }

    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const threshold = 8;

    function syncTopbar() {
      const currentScrollY = Math.max(0, window.scrollY);
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 0) {
        topbar.classList.remove('is-hidden');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      if (Math.abs(delta) >= threshold) {
        topbar.classList.toggle('is-hidden', delta > 0);
        lastScrollY = currentScrollY;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncTopbar);
    }, { passive: true });
  });
})();
