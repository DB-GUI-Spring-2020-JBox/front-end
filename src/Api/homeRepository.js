import {hostname} from './repositoryConfig';
import axios from 'axios';

export class HomeRepository {

  getLatestArticles(params) {
    return new Promise((resolve, reject) => {
      axios.get(hostname + '/api/home')
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

  getArticles(category) {
    return new Promise((resolve, reject) => {
      axios.get(hostname + `/api/browse/${category}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }

  getFeed(userId) {
    return new Promise((resolve, reject) => {
      axios.get(hostname + `/api/home/${userId}`, {userId})
        .then(res => {
          resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }
}

export default HomeRepository;
