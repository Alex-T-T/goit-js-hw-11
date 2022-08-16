import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from "simplelightbox";

export default function renderGallery() {

const gallery = document.querySelector('.gallery');

gallery.innerHTML = '';

  // if (info.hits.length === 0) {
  //   gallery.innerHTML = '';
  //   Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  //   return
  // }

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
  
  gallery.insertAdjacentHTML('afterbegin', renderEl);
  
  const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, captionPosition: "bottom" });

  moreBtn.classList.remove('is-hidden');
}