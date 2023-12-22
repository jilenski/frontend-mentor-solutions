const body = document.body;

/**
 * Template literal for rendering the header element
 */
export const renderHeader = () => {
  const header = document.createElement('header');

  header.innerHTML = `<h1>Where in the world?</h1>`;

  document.body.prepend(header);

  const buttonComponent = themeSelector();
  header.appendChild(buttonComponent);
};

/**
 * Function for selecting the theme
 * @returns button element for the template literal
 */
const themeSelector = () => {
  const buttonEl = document.createElement('button');
  buttonEl.setAttribute('type', 'button');
  buttonEl.classList.add('theme-selector');

  const buttonHTML = `
    <i class="fa-regular fa-moon theme-selector__icon"></i>
    <strong class="theme-selector__text">${body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode'}</strong>
  `;

  buttonEl.innerHTML = buttonHTML;

  return buttonEl;
};
