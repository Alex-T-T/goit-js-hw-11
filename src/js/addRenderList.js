// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const gallery = document.querySelector('.gallery');

function addRenderList(photos) {

  const renderEl = photos.hits.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => (acc += `<a class="gallery__link" href='${largeImageURL}'><div class="photo-card">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes <br> ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views <br> ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments <br> ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads <br> ${downloads}</b>
        </p>
      </div>
    </div></a>`), '') 

  gallery.insertAdjacentHTML('beforeend', renderEl)

  const lightbox =  new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });
  lightbox.refresh();
} 

export default addRenderList;