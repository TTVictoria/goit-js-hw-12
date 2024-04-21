import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import { createMarkup } from './js/render-functions';

import { doFetch } from './js/pixabay-api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
let currentPage = 1;
let searchQuery = '';
let totalPages = 0;

async function onSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;

  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
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
    return;
  }
  loader.classList.toggle('is-hidden');
  try {
    const data = await doFetch(searchQuery, currentPage);

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
    event.target.reset();
    totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage < totalPages) {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    iziToast.show({
      message: error.message,
    });
  } finally {
    loader.classList.toggle('is-hidden');
  }
}

async function onLoadMore() {
  currentPage += 1;
  loader.classList.toggle('is-hidden');
  try {
    const data = await doFetch(searchQuery, currentPage);

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    gallerySimpleLightbox.refresh();
    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });

    if (currentPage === totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.show({
        title: 'error',
        titleColor: 'white',
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: 'white',
        color: 'red',
        position: 'topCenter',
        timeout: '2000',
      });
    }
  } catch (error) {
    iziToast.show({
      message: error.message,
    });
  } finally {
    loader.classList.toggle('is-hidden');
  }
}