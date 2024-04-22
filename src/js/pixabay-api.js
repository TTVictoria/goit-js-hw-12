import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

export async function doFetch(query, page = 1) {
  const API_KEY = '43499454-4c7e954d404e5474a5c884b10';
  const BASE_URL = 'https://pixabay.com/api/';
  const IMAGE_TYPE = 'photo';
  const ORIENTATION = 'horizontal';
  const SAFESEARCH = 'true';
  const PER_PAGE = 15;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: IMAGE_TYPE,
        orientation: ORIENTATION,
        safesearch: SAFESEARCH,
        page: currentPage,
        per_page: PER_PAGE,
      },
    });

    const { data } = response;
    const { hits: images, totalHits } = data;

    if (!Array.isArray(images) || images.length === 0) {
      throw new Error('No images found');
    }

    return { images, totalHits };
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}