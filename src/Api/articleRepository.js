import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class ArticleRepository {

  config = {
    headers: {
      'Access-Control-Allow-Origin' : 'http://localhost:3000'
    }
  };

  getFeed(articleId) {
    return new Promise((resolve, reject) => {
      axios.get(hostname + `/api/articles/${articleId}`, {params:{articleId: articleId}})
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

    getArticle(articleId) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + `/api/articles/${articleId}`)
                .then(response => {
                    if (response.data.length > 0) {
                        resolve(response.data[0])
                    }
                    else {
                        resolve(undefined);
                    }
                })
                .catch(err => {
                    error(err);
                    reject(err);
                });
        });
    }

    getArticlesByUser(userId) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + `/api/articles`, { params: { userId } })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    reject(err);
                });
        });
    }

    deleteArticle(articleId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${hostname}/api/articles/${articleId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    reject(err);
                });
        });
    }

    editArticle(article) {
        return new Promise((resolve, reject) => {
            axios.put(`${hostname}/api/articles/${article.ID}`, { ...article })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    debugger;
                    error(err);
                    reject(err);
                });
        });
    }
}

export default ArticleRepository;
