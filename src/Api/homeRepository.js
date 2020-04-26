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

  // getCategory(category) {
  //   var config = this.config;
  //   config.params = category;
  //   return new Promise((resolve, reject) => {
  //     axios.get(`http://localhost:3201/api/browse/${category}`, config)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(res => alert(res))
  //   });
  // }


  // getFeedArticles(userId) {
  //   axios.get(`${hostname}/home/:userID`, {
  //       params: {
  //         userId
  //       }
  //     })
  //     .then(response => {
  //       return response;
  //     })
  //     .catch(err => {
  //       error(err);
  //     });
  // }


  // getArticles(category) {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${hostname}/api/browse/${category}`, this.config)
  //       .then(res => {
  //         resolve(res.data);
  //       })
  //       .catch(res => alert(res))
  //   });
  // }

}

export default HomeRepository;
