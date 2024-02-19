import ApiClient from './api';


export default class User extends ApiClient {
    constructor() {
        super();
    }

    async login() {
        return this.httpClient.post('login', JSON.stringify({
            //test..
            "email": "inssa@naver.com",
            "password": "string"
        }))
            .then((res) => res.data);
    }

    async logout() {
        // return this.httpClient.get('videos', params);
    }

}
