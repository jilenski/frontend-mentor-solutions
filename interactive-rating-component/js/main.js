const ratingsEl = document.getElementById('rating-options');

let selectedRating;

const getRating = (selectedRating) => {
  const mainEl = document.getElementById('main');
  const btnEl = document.getElementById('btn');

  const thanksHTML = `
    <img src="./images/illustration-thank-you.svg" alt="" />
    <div class="chosen-rating">You selected ${selectedRating} out of 5</div>
    <h2>Thank you!</h2>
    <p>
      We appreciate you taking the time to give a rating. If you ever need
      more support, don’t hesitate to get in touch!
    </p>
  `;

  btnEl.addEventListener('click', () => {
    mainEl.classList.add('thanks');
    mainEl.innerHTML = thanksHTML;
  });
};

const createOption = (rating) => {
  const optionEl = document.createElement('button');
  optionEl.classList.add('option');
  optionEl.textContent = rating;

  optionEl.addEventListener('click', () => {
    const btns = document.querySelectorAll('.option');

    for (const btn of btns) {
      btn.classList.remove('selected');
    }

    optionEl.classList.add('selected');

    getRating(rating);
  });

  ratingsEl.appendChild(optionEl);
};

for (let i = 1; i <= 5; i++) {
  createOption(i);
}
