import { renderHeader } from './components/header.js';

/**
 * Eventlistener that will import module depending on the page
 */
window.addEventListener('load', function () {
  const currentPage = window.location.pathname;

  if (currentPage.includes('index.html')) {
    import('./components/cards.js');
  } else if (currentPage.includes('detail.html')) {
    import('./components/details.js');
  }
});

renderHeader();

/**
 * Setting the theme
 */
const body = document.body;
const buttonEl = document.querySelector('.theme-selector');
const icon = buttonEl.querySelector('.theme-selector__icon');
const text = buttonEl.querySelector('.theme-selector__text');

const savedTheme = localStorage.getItem('isDarkMode');

const toggleClasses = () => {
  body.classList.toggle('dark');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
};

const applyTheme = () => {
  if (savedTheme === null) {
    setSystemTheme();
  } else if (savedTheme === 'true') {
    toggleClasses();
    text.textContent = savedTheme ? 'Light Mode' : 'Dark Mode';
  }
};

const setSystemTheme = () => {
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  body.classList.add('dark', isSystemDark);
};

const toggleDarkTheme = () => {
  toggleClasses();
  const isDarkMode = body.classList.contains('dark');
  text.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

  localStorage.setItem('isDarkMode', isDarkMode);
};

buttonEl.addEventListener('click', toggleDarkTheme);

applyTheme();
