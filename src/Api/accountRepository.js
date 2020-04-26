
import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class AccountRepository {

  config = {
    headers: {
      'Access-Control-Allow-Origin' : 'http://localhost:3000'
    }
  };
  
    login(email, password) {
        axios.post(`${hostname}/api/login`, { email, password })
            .then(response => {
                if (response === "true")
                    return true;
                else
                    return false;
            })
            .catch(err => {
                error(err);
                return 'error';
            });
    }

    register(firstName, lastName, email, password) {
        axios.post(`${hostname}/api/register`, { name: `${firstName} ${lastName}`, email, password })
            .then(response => {
                return response;
            })
            .catch(err => {
                error(err);
                return 'error';
            });
    }
}

export default AccountRepository;
