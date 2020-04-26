import { hostname } from './repositoryConfig';
import axios from 'axios';

export class SearchRepository {

  search(param){
    return new Promise((resolve, reject) => {
        axios.post(`${hostname}/search`, param, this.config)
        .then(res => {
            resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }
}

export default SearchRepository;
