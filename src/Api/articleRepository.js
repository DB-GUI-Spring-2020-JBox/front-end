import { hostname } from './repositoryConfig';
import axios from 'axios';

export class ArticleRepository {

  config = {
    headers: {
      'Access-Control-Allow-Origin' : 'http://localhost:3000'
    }
  };

  getArticles(category) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3201/api/browse/${category}`, {params:{category: category}})
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

    getArticle(articleId) {
      return new Promise((resolve, reject) => {
        axios.get(`${hostname}/api/articles/${articleId}`,  {params:{articleId: articleId}})
        .then(res => {
          resolve(res.data);
            })
          .catch(res => alert(res))
            });
          }
}

export default ArticleRepository;
