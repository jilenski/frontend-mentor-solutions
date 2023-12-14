const form = document.getElementById('cta-form');
const btn = document.getElementById('cta-btn');

btn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  if (!validateEmail(email)) {
    const errorMessage = document.getElementById('error-message');

    emailInput.classList.add('error-outline');
    errorMessage.textContent = 'Please enter a valid email address';
    errorMessage.style.visibility = 'visible';
  }
}

function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9.-]+))\.([a-zA-Z]{2,})$/;
  return regex.test(email);
}
