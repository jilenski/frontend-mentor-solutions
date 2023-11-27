const cardsContainer = document.getElementById('cards-container');

const summaryItems = [];

getSummaries();

async function getSummaries() {
  const res = await fetch('data.json');
  const data = await res.json();

  data.forEach((card) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.style.color = `hsl(${card.color})`;
    cardEl.style.backgroundColor = `hsla(${card.color}, 0.1)`;

    summaryItems.push(cardEl);

    cardEl.innerHTML = `
      <div class='card-category'>  
        <img src='${card.icon}' />
        <p>${card.category}</p>
      </div>
      <div class='card-score'>
        <p>${card.score} <span>/ 100</span></p>
      </div>
    `;

    cardsContainer.appendChild(cardEl);
  });
}
