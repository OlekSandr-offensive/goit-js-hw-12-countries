import './sass/main.scss';
import countryCardTlp from './partials/country-card.hbs';
import debounce from 'lodash.debounce';

// const refs = {
//   input: document.querySelector('[data-action="searchCountry"]'),
// };

// refs.input.addEventListener('input', debounce(onInputCountry, 500));

// function onInputCountry() {}

fetch('https://restcountries.eu/rest/v2/name/Colombia')
  .then(response => {
    return response.json();
  })
  .then(country => {
    console.log(country);
    const markup = countryCardTlp(country);
    console.log(markup);
  })
  .catch(err => {
    console.log(err);
  });
