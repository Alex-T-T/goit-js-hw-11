// import addRenderList from "./addRenderList";
// import checkHitsLength from "./checkHitsLength";
// import smoothScroll from "./smoothScroll";
// import PhotoApiService from "./photo-API";
// const photoApiService = new PhotoApiService();


function loadMoreContent() {

  photoApiService.fetchPhotos()
    .then(photos => {
      checkHitsLength(photos);
      addRenderList(photos);
    })
    .then(smoothScroll)
    .catch(error => console.log(error));
    
}

export default loadMoreContent;