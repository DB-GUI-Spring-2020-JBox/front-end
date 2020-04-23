
import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class ArticleRepository {

    getArticle(articleId) {
        axios.get(`${hostname}/api/articles/${articleId}`)
            .then(response => {
                return response;
            })
            .catch(err => {
                error(err);
                return 'error';
            });
    }
}

export default ArticleRepository;