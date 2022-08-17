// import clearGalleryList from './clearGalleryList';
// import checkData from './checkData';
// import Notiflix from "notiflix";
// import addRenderList from './addRenderList';
// import PhotoApiService from "./photo-API";
// const photoApiService = new PhotoApiService();



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

export default getData;