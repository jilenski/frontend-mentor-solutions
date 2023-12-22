import { getData } from '../utils/getData.js';

/**
 * HTML elements
 */
const backButton = document.querySelector('.back-btn');
const detailContainer = document.querySelector('.detail-page');

/**
 * Back button function
 */
backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

/**
 * Get the data for the specific card
 * @param {Array} data - list of countries and all of its details
 */
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

getData().then((data) => {
  const countryDetails = data.find((country) => country.alpha3Code === cardId);

  renderDetails(countryDetails);
});

/**
 * Template literal for country details
 * @param {Array} country - data for each country
 */
const renderDetails = (country) => {
  /** Set variables with specific conditions */
  const population = country.population.toLocaleString('en-US');
  const currencies = concatenate(country.currencies);
  const languages = concatenate(country.languages);

  /** Create HTML contents */
  const sectionEl = document.createElement('section');
  sectionEl.classList.add('detail-container');

  const detailsHTML = `
    <div class="flag-image"></div>

    <div class="details">
      <h2>${country.name}</h2>

      <div class="country-details">
        <div class="country-details__primary">
          <p><strong>Native Name:</strong> <span>${country.nativeName}</span></p>
          <p><strong>Population:</strong> <span>${population}</span></p>
          <p><strong>Region:</strong> <span>${country.region}</span></p>
          <p><strong>Sub Region:</strong> <span>${country.subregion}</span></p>
          <p><strong>Capital:</strong> <span>${country.capital}</span></p>
        </div>

        <div class="country-details__secondary">
          <p><strong>Top Level Domain:</strong> <span>${country.topLevelDomain}</span></p>
          <p><strong>Currencies:</strong> <span>${currencies}</span></p>
          <p><strong>Languages:</strong> <span>${languages}</span></p>
        </div>
      </div>

      <div class="details__others">
        <h3>Border Countries:</h3>
        <div class="details__others__cards"></div>
      </div>
    </div>
  `;

  sectionEl.innerHTML = detailsHTML;

  /** Append flag image content */
  const flagImage = sectionEl.querySelector('.flag-image');
  flagImage.style.setProperty('--before-background-image', `url('${country.flag}')`);

  detailContainer.appendChild(sectionEl);

  createBorderCountryCards(country.borders);
};

/**
 * Creates cards for border coutries and convert alpha3Code to respective country name
 * @param {Array} borders - this is an array border countries in alpha3Code value
 */
const createBorderCountryCards = (borders) => {
  const borderCountryCard = document.querySelector('.details__others__cards');

  if (!borders || !Array.isArray(borders)) {
    return;
  }

  borders.forEach((border) => {
    const countrySpan = document.createElement('span');
    countrySpan.classList.add('border-country-card');

    /** Converting alpha3code to full country name */
    getData().then((data) => {
      const match = data.find((country) => country.alpha3Code === border);

      if (match) {
        const countryName = match.name;
        countrySpan.textContent = countryName;
        borderCountryCard.append(countrySpan);
      }
    });

    /** Adding click event to each cards to redirect to the country detail's page */
    countrySpan.addEventListener('click', () => {
      window.location.href = `detail.html?id=${border}`;
    });
  });
};

/**
 * Concatenates the names in an array of items
 * @param {Array} items - will use for currencies and languages
 * @returns {string} - concatenated items
 */
const concatenate = (items) => {
  let result = '';

  items.forEach((item, i) => {
    if (i > 0) {
      result += ', ';
    }
    result += item.name;
  });

  return result;
};
