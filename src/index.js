import axios from "axios";
import Notiflix from "notiflix";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

import PhotoApiService from "./js/photo-API";
// import renderGallery from "./js/renderGallery";
// import getRequest from "./js/getRequest";

const form = document.querySelector('#search-form');
const input = form.searchQuery;
const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more.is-hidden');
const photoApiService = new PhotoApiService();

// let searchValue = '';
// let page = 1;
// // let perPage = 

form.addEventListener('submit', getData);
moreBtn.addEventListener('click', loadMoreContent);

// // // ==============================
// // // with fetch

// // function getData() {

// //   const searchValue = input.value;
// //   const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true`;

// //   fetch(url)
// //     .then(response => response.json())
// //     .then(console.log(response))
// //     .catch(error => console.log(error))
// // }

// // // ==============================
// // // with async/await

// // async function getData() {

// //   const searchValue = input.value;
// //   const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true`;

// //   try {
// //       const response = await fetch(url);
// //       const data = await response.json();
// //       console.log(data);
// //   } catch (error) {
// //     console.log(error)
// //   }
// // }

// // ==============================
// // with axios async/await

// function getData(event) {
//   event.preventDefault();

//     photoApiService.searchValue = event.target.searchQuery.value;
 
//     if (searchValue === '') {
//       gallery.innerHTML = '';
//       return;
//     }

//   // getRequest(searchValue)
//   //   .then(renderGallery)
//   //   .catch(error => console.log(error))
//   photoApiService.fetchPhoto();

//   }

// // ==============================
// // request

// // async function getRequest(searchValue) {
// //   const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

// //     try {
// //         const response = await axios.get(url);
// //         return response.data
// //     } catch (error) {
// //       console.log(error)
// //     }
// // }

// // ==============================
// // render HTML

// // function renderGallery(info) {

// // page += 1;

// // gallery.innerHTML = '';

// //   if (info.hits.length === 0) {
// //     gallery.innerHTML = '';
// //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
// //     return
// //   }

// //   const renderEl = info.hits.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => (acc += `<a class="gallery__link" href='${largeImageURL}'><div class="photo-card">
// //   <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
// //    <div class="info">
// //      <p class="info-item">
// //        <b>Likes ${likes}</b>
// //      </p>
// //      <p class="info-item">
// //        <b>Views ${views}</b>
// //      </p>
// //      <p class="info-item">
// //        <b>Comments ${comments}</b>
// //      </p>
// //      <p class="info-item">
// //        <b>Downloads ${downloads}</b>
// //      </p>
// //    </div>
// //  </div></a>`), '') 
  
// //   gallery.insertAdjacentHTML('afterbegin', renderEl);
  
// //   new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });

// //   moreBtn.classList.remove('is-hidden');
// // }

// // ==============================
// // more content

// function loadMoreContent (searchValue) {
  
//   getRequest(searchValue);
 
// }


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
  .then(addRenderList);
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
} 

function clearGalleryList() {
  gallery.innerHTML = '';
}

function checkData(data) {
  
  let totalHits = data.totalHits;
  let total = data.total;
  let hits = data.hits;
  
  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    moreBtn.classList.add('is-hidden');
    return;
  } else {
    moreBtn.classList.remove('is-hidden');
    Notiflix.Notify.success(`Hooray! We found ${totalHits} from ${total} images.`)
  }
  
}