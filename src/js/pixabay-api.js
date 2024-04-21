export function doFetch(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43499454-4c7e954d404e5474a5c884b10';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}