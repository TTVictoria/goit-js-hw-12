import axios from 'axios';

export async function doFetch(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43499454-4c7e954d404e5474a5c884b10';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15, 
    page,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}
