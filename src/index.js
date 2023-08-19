import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getData } from './api';
import { createMarkup } from './markup';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let page = 1;

const formEl = document.querySelector('.search-form');

const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  try {
    event.preventDefault();
    const value = event.target.elements.searchQuery.value.trim();
    if (!value) {
      return;
    }
    const { hits, totalHits } = await getData(value, page);
    const markup = createMarkup(hits);
    clear();
    addMarkup(markup);
  } catch (error) {}
}

function addMarkup(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clear() {
  galleryEl.innerHTML = '';
}
