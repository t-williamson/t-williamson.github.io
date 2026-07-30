(function () {
  var root = document.documentElement;
  var body = document.body;
  var toggle = document.querySelector('.theme-toggle');
  var storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem('theme');
  } catch (error) {
    storedTheme = null;
  }

  function setTheme(theme) {
    var isDark = theme === 'dark';
    body.classList.toggle('theme-dark', isDark);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  setTheme(storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', function () {
      var nextTheme = body.classList.contains('theme-dark') ? 'light' : 'dark';
      setTheme(nextTheme);
      try {
        window.localStorage.setItem('theme', nextTheme);
      } catch (error) {}
    });
  }

  var revealItems = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}());
