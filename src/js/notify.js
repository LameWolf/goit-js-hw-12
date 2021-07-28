import Notiflix from 'notiflix';

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onFetchInfo() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchSuccess() {
  Notiflix.Notify.success('Congratulations! Request completed.');
}

export { onFetchError, onFetchInfo, onFetchSuccess };
