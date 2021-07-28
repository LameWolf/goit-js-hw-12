import './sass/main.scss';
import getRefs from './js/getRefs';
import API from './js/fetchCountries';
import { onFetchError, onFetchInfo, onFetchSuccess } from './js/notify';
import countryDescrp from '../src/templates/countryInfo.hbs';
import countryList from '../src/templates/countryList.hbs';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  const form = e.target.value;

  API.fetchCountries(form)
    .then(getCountry)
    .catch(error => {
      console.log(error);
    });
}

function getCountry(country) {
  if (country.length === 1) {
    renderCountryCard(country[0]);
    onFetchSuccess();
    return;
  } else if (country.length >= 2 && country.length <= 10) {
    renderCountryList(country);
    return;
  } else if (country.length > 10) {
    onFetchInfo();
    return;
  } else if (country.status === 404) {
    onFetchError();
    return;
  }
}

function renderCountryCard(country) {
  const markup = countryDescrp(country);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function renderCountryList(country) {
  const markup = countryList(country);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}
