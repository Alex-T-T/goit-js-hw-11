import axios from "axios";
import Notiflix from "notiflix";

import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const form = document.querySelector('#search-form');
const input = form.searchQuery;
const button = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more.is-hidden');

let searchValue = '';
let page = 1;
// let perPage = 

// input.addEventListener('input', debounce(findValue, 500));
form.addEventListener('submit', getData);
moreBtn.addEventListener('click', moreContent);
// // ==============================
// // with fetch

// function getData() {

//   const searchValue = input.value;
//   const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true`;

//   fetch(url)
//     .then(response => response.json())
//     .then(console.log(response))
//     .catch(error => console.log(error))
// }

// // ==============================
// // with async/await

// async function getData() {

//   const searchValue = input.value;
//   const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true`;

//   try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log(data);
//   } catch (error) {
//     console.log(error)
//   }
// }

// ==============================
// with axios async/await

// function findValue() {
//   const searchValue = input.value;
//   return searchValue;
// }

function getData(event) {
  event.preventDefault();

    searchValue = event.target.searchQuery.value;
 

    if (searchValue === '') {
      gallery.innerHTML = '';
      return;
    }

  getRequest(searchValue)
    .then(renderGallery)
    .catch(error => console.log(error))
  }

// ==============================
// request

async function getRequest(searchValue) {
  const url = `https://pixabay.com/api/?q=${searchValue}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

    try {
        const response = await axios.get(url);
        return response.data
    } catch (error) {
      console.log(error)
    }
}

// ==============================
// render HTML

function renderGallery(info) {

page += 1;

gallery.innerHTML = '';

  if (info.hits.length === 0) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  const renderEl = info.hits.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => (acc += `<a class="gallery__link" href='${largeImageURL}'><div class="photo-card">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
   <div class="info">
     <p class="info-item">
       <b>Likes ${likes}</b>
     </p>
     <p class="info-item">
       <b>Views ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments ${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads ${downloads}</b>
     </p>
   </div>
 </div></a>`), '') 
  
//     const renderEl = info.hits.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => (acc += `<a class="gallery__link" href='${largeImageURL}'><div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div></a>`), '') 
  
  
  gallery.insertAdjacentHTML('afterbegin', renderEl);
  
  new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });

  moreBtn.classList.remove('is-hidden');
}

// ==============================
// more content

function moreContent (searchValue) {
  
  getRequest(searchValue);
 
}

