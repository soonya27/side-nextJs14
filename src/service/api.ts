import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'http://3.35.218.78:8080/api/v1',
});


export default class ApiClient {
    httpClient;
    constructor() {
        this.httpClient = axios.create({
            baseURL: 'http://3.35.218.78:8080/api/v1',
        });
    }
}