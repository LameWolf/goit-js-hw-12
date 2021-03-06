import { onFetchError, onFetchInfo, onFetchSuccess } from './notify';

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=name;capital;population;flag;languages`).then(
    response => {
      if (!response.ok) {
        onFetchError();
        return Promise.reject(response.status);
      }
      return response.json();
    },
  );
}

export default { fetchCountries };
