import { doFetch } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';
import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  inputText: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1;

refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();

  page = 1;

  refs.gallery.innerHTML = '';

  const name = refs.inputText.value.trim();

  if (name !== '') {
    instance(name);
  } else {
    refs.loadMoreBtn.style.display = 'none';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

function onLoadMore() {
  const name = refs.inputText.value.trim();

  page += 1;

  instance(name, page);
}

async function instance(name, page) {
  try {
    const data = await doFetch(name, page);
    notification(data.hits.length, data.totalHits);
    createItems(data.hits);
  } catch (error) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function createItems(photos) {
  const markup = photos
    .map(
      item => `<a class ="photo-link" href="${item.largeImageURL}">
    <div class="photo-card">
        <div class="photo">
     <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
        </div>
     <div class="info">
       <p class="info-item">
         <b>Likes: ${item.likes}</b>
       </p>
       <p class="info-item">
         <b>Views: ${item.views}</b>
       </p>
       <p class="info-item">
         <b>Comments: ${item.comments}</b>
       </p>
       <p class="info-item">
         <b>Downloads: ${item.downloads}</b>
       </p>
     </div>
     </div>
   </a>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  simpleLightbox.refresh();
}

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function notification(length, totalHits) {
  if (length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (page === 1) {
    refs.loadMoreBtn.style.display = 'flex';

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (page >= Math.ceil(totalHits / 15)) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}