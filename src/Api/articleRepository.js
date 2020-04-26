
import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class ArticleRepository {

    getArticle(articleId) {
        return new Promise((resolve, reject) => {
            axios.get(`${hostname}/api/articles/${articleId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    reject(err);
                });
        });
    }

    getArticlesByUser(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`${hostname}/api/articles`, { params: { userId } })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    reject(err);
                });
        });
    }
}

export default ArticleRepository;