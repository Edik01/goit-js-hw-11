export function createMarkup(items = []) {
  return items
    .map(
      ({
        comments,
        views,
        likes,
        downloads,
        webformatURL,
        largeImageURl,
        tags,
      }) => {
        return `<a href='${largeImageURl}' class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <div class="info-item">
        <b>Likes</b>
        <p>${likes}</p>
      </div>
      <div class="info-item">
        <b>Views</b>
        <p>${views}</p>
      </div>
      <div class="info-item">
        <b>Comments</b>
    <p>${comments}</p>
      </div>
      <div class="info-item">
        <b>Downloads</b>
        <p>${downloads}</p>
      </div>
    </div>
  </a>`;
      }
    )
    .join('');
}
