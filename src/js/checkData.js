// import Notiflix from "notiflix";
// const moreBtn = document.querySelector('.load-more.is-hidden');

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

export default checkData;