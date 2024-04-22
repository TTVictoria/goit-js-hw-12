import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

export async function doFetch(query, page) {
  const API_KEY = '43499454-4c7e954d404e5474a5c884b10';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });
  const { data } = await axios(`https://pixabay.com/api/?${params}`);
  return data;
}