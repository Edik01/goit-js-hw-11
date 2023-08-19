import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '38796397-a00862f58ea99d9d4af60dbc9';
export async function getData(q, page) {
  const params = new URLSearchParams({
    key: KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });
  const { data } = await axios.get(`?${params}`);
  return data;
}
