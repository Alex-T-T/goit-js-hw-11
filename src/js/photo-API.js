import axios from "axios";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '29186842-8a22994ff73abec3697b1eb66';

export default class PhotoApiService {
    constructor(){
        this.searchValue = '';
        this.page = 1;
        this.per_page = 40;
    }

    async fetchPhotos() {
        const url = `${BASE_URL}/?q=${this.searchValue}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

        try {
            const {data} = await axios.get(url);
            this.page += 1;
            console.log(data);
            console.log(data.hits.length);
            return data;
        } catch (error) {
            return console.log(error);
        }
    }

    get value() {
        return this.searchValue;
    }

    set value(newValue) {
        this.searchValue = newValue;
    }

    resetPage() {
        this.page = 1;
    }

}


