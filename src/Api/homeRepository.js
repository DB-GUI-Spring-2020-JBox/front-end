import {hostname} from './repositoryConfig';
import axios from 'axios';

export class HomeRepository {

  config = {
    headers: {
      'Access-Control-Allow-Origin' : 'http://localhost:3000'
    }
  };

  getLatestArticles(params) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3201/api/home')
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

  getArticles(category) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3201/api/browse/${category}`, {params:{category: category}})
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

  getFeed(userId) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:3201/api/home/${userId}`, {params:{userId: userId}})
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }
}

export default HomeRepository;
