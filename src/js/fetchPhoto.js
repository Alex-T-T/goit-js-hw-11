function fetchPhotos(q) {
    const url = `https://pixabay.com/api/?${q}&key=29186842-8a22994ff73abec3697b1eb66&image_type=photo&orientation=horisontal&safesearch=true`;

    return fetch(url).then(response => response.json());
}