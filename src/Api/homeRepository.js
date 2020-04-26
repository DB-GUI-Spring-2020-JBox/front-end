import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class HomeRepository {

  getLatestArticles(params) {
    var config = this.config;
    config.params = params;
    return new Promise((resolve, reject) => {
      axios.get(`${hostname}/home`, config)
        .then(x => resolve(x.data))
        .catch(x => {
          alert(x);
          reject(x);
        });
    });
  }

  getFeedArticles(userId) {
      axios.get(`${hostname}/browse`, { params: { userId } })
          .then(response => {
              return response;
          })
          .catch(err => {
              error(err);
          });
  }

}

export default HomeRepository;
