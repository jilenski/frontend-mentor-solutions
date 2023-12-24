const formEl = document.getElementById('form');

const handleSubmit = (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  if (!validateEmail(email)) {
    formEl.classList.add('error');
  }
};

formEl.addEventListener('submit', handleSubmit);

/** Email Validation */
function validateEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+)@([a-zA-Z0-9.-]+))\.([a-zA-Z]{2,})$/;
  return regex.test(email);
}
