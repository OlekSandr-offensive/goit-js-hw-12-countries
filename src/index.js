import './sass/main.scss';
import countryCardTlp from './partials/country-card.hbs';
import debounce from 'lodash.debounce';

const refs = {
  cardContainer: document.querySelector('.js-card-container'),
  input: document.querySelector('[data-action="searchCountry"]'),
};

fetch('https://restcountries.eu/rest/v2/name/canada')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markup = countryCardTlp(country);
    refs.cardContainer.innerHTML = markup;
    console.log(markup);
  })
  .catch(err => {
    console.log(err);
  });

// refs.input.addEventListener('input', debounce(onInputCountry, 500));

// function fetchCountry(country) {
//   return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(
//     response => {
//       return response.json();
//     },
//   );
// }

// function onInputCountry(evt) {
//   evt.preventDefault();
//   const countryName = evt.target.value;
// }
