import './sass/main.scss';
import countryCardTlp from './partials/country-card.hbs';
import debounce from 'lodash.debounce';
import API from './partials/fetchCountries';
import getRefs from './partials/get-refs';

const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCardTlp(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  alert({
    text: 'Notice me, senpai!',
  });
}
