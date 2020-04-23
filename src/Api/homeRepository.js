import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class HomeRepository {

  getLatestArticles(userId) {
      axios.get(`${hostname}/browse`, { params: { userId } })
          .then(response => {
              return response;
          })
          .catch(err => {
              error(err);
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
