import axios from "axios";
import Notiflix from "notiflix";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import PhotoApiService from "./js/photo-API";
import smoothScroll from "./js/smoothScroll";
// import getData from "./js/getData";
// import loadMoreContent from "./js/loadMoreContent";

const form = document.querySelector('#search-form');
const input = form.searchQuery;
const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more.is-hidden');
const photoApiService = new PhotoApiService();


form.addEventListener('submit', getData);
moreBtn.addEventListener('click', loadMoreContent);


function getData(event) {

  event.preventDefault();

  photoApiService.value = event.currentTarget.searchQuery.value;

  if (photoApiService.value === '') {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  photoApiService.resetPage();
  photoApiService.fetchPhotos()
    .then(photos => {
      clearGalleryList();
      checkData(photos);
      addRenderList(photos);
    })
    .catch(error => console.log(error));
}

function loadMoreContent() {

  photoApiService.fetchPhotos()
    .then(photos => {
      checkHitsLength(photos);
      addRenderList(photos);
    })
    .then(smoothScroll)
    .catch(error => console.log(error));
    
}

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

function clearGalleryList() {
  gallery.innerHTML = '';
}

function checkData(data) {
  
  let totalHits = data.totalHits;
  let total = data.total;
  let hits = data.hits;
  
  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    moreBtn.classList.add('is-hidden');
  } else {
    moreBtn.classList.remove('is-hidden');
    Notiflix.Notify.success(`Hooray! We found ${totalHits} from ${total} images.`);
  }
  
}

function checkHitsLength(data) {

  if (data.hits.length < photoApiService.per_page) {
    moreBtn.classList.add('is-hidden');
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  return;
  }
}