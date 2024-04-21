import { doFetch } from './pixabay-api';
import { createMarkup } from './render-functions';

let page = 1;

async function fetchImages(query) {
  try {
    const data = await doFetch(query, page);
    if (data.totalHits === 0) {
      console.log("We're sorry, but you've reached the end of search results.");
      return;
    }

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

