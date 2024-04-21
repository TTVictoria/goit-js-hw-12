import axios from 'axios';

export async function doFetch(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43499454-4c7e954d404e5474a5c884b10';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    if (!response.status === 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
