import ApiClient from './api';


export default class Post extends ApiClient {
    constructor() {
        super();
    }

    async getPosts() {
        return this.httpClient.get('board/posts', {
            params: {
                page: 0,
                size: 20,
                sort: '',
                type: 'NORMAL'
            },
        })
            .then((res) => {
                console.log(res.data)
                return res.data
            });
    }


}
