const formEl = document.getElementById('form');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('error-message');

const handleSubmit = (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const noEmailProvided = 'Whoops! It looks like you forgot to add your email';
  const badEmail = 'Please provide a valid email address';

  if (!validateEmail(email)) {
    formEl.classList.add('error');

    errorMessage.textContent = email.length == 0 ? noEmailProvided : badEmail;
  } else {
    formEl.classList.remove('error');
  }
};

formEl.addEventListener('submit', handleSubmit);

/** Email Validation */
function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9.-]+))\.([a-zA-Z]{2,})$/;
  return regex.test(email);
}
