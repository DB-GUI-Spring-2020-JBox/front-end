import { hostname } from './repositoryConfig';
import axios from 'axios';

export class SearchRepository {

  search(param){
    return new Promise((resolve, reject) => {
        axios.get(hostname + `/api/search/${param.input}/${param.category}/${param.filter}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(res => alert(res))
    });
  }
}

export default SearchRepository;
