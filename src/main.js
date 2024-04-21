import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import { createMarkup } from './js/render-functions';

import { doFetch } from './js/pixabay-api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  if (!searchQuery) {
    iziToast.show({
      title: 'error',
      titleColor: 'white',
      message: 'Please, enter a word ',
      messageColor: 'white',
      color: 'red',
      position: 'topCenter',
      timeout: '2000',
    });
    event.currentTarget.reset();
    return;
  }
  loader.classList.toggle('is-hidden');

  doFetch(searchQuery)
    .then(data => {
      if (data.total === 0) {
        iziToast.show({
          title: 'error',
          titleColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          color: 'red',
          position: 'topCenter',
          timeout: '2000',
        });
        return;
      }
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      gallerySimpleLightbox.refresh();
    })
    .catch(error => {
      iziToast.show({
        message: error.message,
      });
    })
    .finally(() => {
      loader.classList.toggle('is-hidden');
    });
}