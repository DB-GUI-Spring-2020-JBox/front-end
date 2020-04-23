import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class BrowseRepository {

  getArticles(category) {
      axios.get(`${hostname}/browse`, { params: { category } })
          .then(response => {
              return response;
          })
          .catch(err => {
              error(err);
          });
  }
  
}

export default BrowseRepository;
