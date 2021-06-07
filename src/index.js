import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import countryCardTlp from './partials/country-card.hbs';
import debounce from 'lodash.debounce';
import API from './partials/fetchCountries';
import getRefs from './partials/get-refs';
import {
  alert,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

alert({
  text: 'Too many matches found. Please enter a more specific query!',
});
defaultModules.set(PNotifyMobile, {});

// const myStack = new PNotify.Stack({ dir1: 'down', firstpos1: 25 });
// PNotify.notice({
//   text: 'Notice 1.',
//   stack: myStack,
// });

const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(clearPageMarkup);
}

function renderCountryCard(country) {
  const markup = countryCardTlp(country);
  refs.cardContainer.innerHTML = markup;
}

function clearPageMarkup(e) {
  if (e.target.value.length === 0) {
    refs.cardContainer.innerHTML = ' ';
    return;
  }
  // refs.cardContainer.innerHTML = ' ';
  console.log('hello Vova');
}

function onFetchError() {
  console.log('hello Sasha');
  // return PNotify.error({
  //   text: 'Too many matches found. Please enter a more specific query!',
  //   modules: new Map([...PNotify.defaultModules, [PNotifyDesktop, {}]]),
  // });
}
