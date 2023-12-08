/** Form Component */
const formEl = document.querySelectorAll('form');
const formLabels = [
  {
    placeholder: 'Enter your email...',
    button: 'Get Started',
  },
  {
    placeholder: 'email@example.com',
    button: 'Get Started For Free',
  },
];

formEl.forEach((formEl, i) => {
  const { placeholder, button } = formLabels[i];

  formEl.innerHTML = `
    <input type="text" id="email" name="email" placeholder="${placeholder}" aria-label="hero section email" autocomplete="off" class=""/>
    <span class="error-message"></span>
    <button type="submit">${button}</button>
  `;

  formEl.addEventListener('submit', handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const emailInput = e.target.querySelector('input');
    const email = emailInput.value;

    if (!validateEmail(email)) {
      const errorMessage = e.target.querySelector('.error-message');
      errorMessage.textContent = 'Please check your email';
      errorMessage.style.visibility = 'visible';

      emailInput.classList.add('error-outline');
    }
  }

  /** Email Validation */
  function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9.-]+))\.([a-zA-Z]{2,})$/;
    return regex.test(email);
  }
});
