import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import { getData } from './api';
import { createMarkup } from './markup';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;

let value = '';

const formEl = document.querySelector('.search-form');

const galleryEl = document.querySelector('.gallery');

const btnEl = document.querySelector('.load-more');
btnEl.addEventListener('click', onClick);
async function onClick() {
  try {
    page += 1;
    const { hits, totalHits } = await getData(value, page);
    const markup = createMarkup(hits);

    addMarkup(markup);
    lightbox.refresh();
    if (page * 40 >= totalHits) {
      btnEl.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    onError(error.message);
  }
}

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  try {
    event.preventDefault();
    value = event.target.elements.searchQuery.value.trim();
    if (!value) {
      return;
    }
    page = 1;
    const { hits, totalHits } = await getData(value, page);
    if (!hits.length) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.success(`Hooray! We found ${totalHits} images.`);
    if (hits.length < 40) {
      btnEl.classList.add('is-hidden');
    } else {
      btnEl.classList.remove('is-hidden');
    }

    const markup = createMarkup(hits);
    clear();
    addMarkup(markup);

    lightbox.refresh();
  } catch (error) {
    onError(error.message);
  }
}

function addMarkup(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function clear() {
  galleryEl.innerHTML = '';
}

function onError(message) {
  Notify.failure(message);
}
