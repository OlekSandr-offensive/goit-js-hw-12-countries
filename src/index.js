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
  text: 'Notice me, senpai!',
});
// defaultModules.set(PNotifyMobile, {});

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

  API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCardTlp(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  return notice({
    text: "I'm a notice.",
  });
}
