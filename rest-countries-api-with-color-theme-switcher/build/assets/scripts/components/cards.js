import { getData } from '../utils/getData.js';

/**
 * HTML elements
 */
const cardsContainer = document.querySelector('.cards-container');
const searchInput = document.getElementById('search');
const regionFilter = document.querySelector('.search-filter');
const optionEl = document.querySelectorAll('.option');

/**
 * Initialize variables
 */
let totalCardsRendered = 0;
let currentData;

/**
 * Calculating the numbers of initial cards to render
 */
const getCardsPerRow = () => {
  const computedStyle = getComputedStyle(cardsContainer);
  const columnCount = computedStyle.gridTemplateColumns.split(' ').length;

  return columnCount;
};

const getInitialCardsCount = () => {
  const rowHeight = 336;
  const rows = Math.ceil(window.innerHeight / rowHeight);

  return getCardsPerRow() * rows;
};

/**
 * Template literals that will use to render cards
 */
const getCards = (data) => {
  data.forEach((country) => {
    const cardId = country.alpha3Code;
    const population = country.population.toLocaleString('en-US');

    const cardEl = document.createElement('div');
    cardEl.setAttribute('id', `${cardId}`);
    cardEl.classList.add('card');

    const cardHTML = `
      <div class="card__image"></div>
      <div class="card__details">
        <h2>${country.name}</h2>
        <p><strong>Population:</strong> <span>${population}</span></p>
        <p><strong>Region:</strong> <span>${country.region}</span></p>
        <p><strong>Capital:</strong> <span>${country.capital}</span></p>
      </div>
    `;
    cardEl.innerHTML = cardHTML;

    const cardImage = cardEl.querySelector('.card__image');
    cardImage.style.backgroundImage = `url('${country.flags.png}')`;
    cardImage.loading = 'lazy';

    cardEl.addEventListener('click', () => {
      window.location.href = `detail.html?id=${cardId}`;
    });

    cardsContainer.append(cardEl);

    totalCardsRendered++;
  });
};

/**
 * Initialize render
 */
getData().then((data) => {
  currentData = data;
  initializeRender(currentData);
});

/**
 * Filtering by region
 */
optionEl.forEach((option) => {
  const filteredRegion = document.querySelector('.search-filter__button__text');

  option.addEventListener('click', () => {
    const chosenRegion = option.textContent;
    filteredRegion.textContent = chosenRegion;

    getData().then((data) => {
      currentData = data.filter((country) => country.region.includes(chosenRegion));
      initializeRender(currentData);
    });
  });
});

/**
 * Search function
 */
searchInput.addEventListener('input', (e) => {
  const inputValue = e.target.value.toLowerCase();

  const searchedData = currentData.filter((country) => country.name.toLowerCase().includes(inputValue));

  initializeRender(searchedData);
});

/**
 * Function for initial render whether filtered or unfiltered
 * @param {*} data = current data
 */
const initializeRender = (data) => {
  totalCardsRendered = 0;
  cardsContainer.innerHTML = '';

  const shuffledData = shuffleCards(data);

  getCards(shuffledData.slice(0, getInitialCardsCount()));
};

/**
 * Function to randomly display cards
 * @param {*} data = current data
 * @returns shuffled array
 */
const shuffleCards = (data) => {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
};

/**
 * Function for loading more cards per row
 */
const loadMoreCards = () => {
  const startIndex = totalCardsRendered;
  const newCards = currentData.slice(startIndex, startIndex + getCardsPerRow());

  getCards(newCards);
};

/**
 * Functions for scroll event
 */
const handleScroll = () => {
  const lastCard = cardsContainer.lastElementChild;
  const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
  const pageOffset = window.scrollY + window.innerHeight;

  if (pageOffset > lastCardOffset) {
    loadMoreCards();
  }
};

window.addEventListener('scroll', handleScroll);

/**
 * Event for toggling the region filter options
 */
regionFilter.addEventListener('click', () => {
  const optionsContainer = document.querySelector('.search-filter--options');

  const isVisible = optionsContainer.style.visibility === 'visible';
  optionsContainer.style.visibility = isVisible ? 'hidden' : 'visible';
});
