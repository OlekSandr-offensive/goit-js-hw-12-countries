import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import './sass/main.scss';
import countryCardTlp from './partials/country-card.hbs';
import listCountryTlp from './partials/list-country-card.hbs';
import debounce from 'lodash.debounce';
import API from './partials/fetchCountries';
import getRefs from './partials/get-refs';

const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;
  if (searchQuery.length === 0) {
    refs.cardContainer.innerHTML = ' ';
  }
  API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  if (country.length === 1) {
    const markup = countryCardTlp(country);
    refs.cardContainer.innerHTML = markup;
  } else if (country.length < 10) {
    const markup = listCountryTlp(country);
    refs.cardContainer.innerHTML = markup;
  } else {
    onFetchError();
  }
}

function onFetchError() {
  error({
    title: 'Oh No!',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 4000,
  });
}
