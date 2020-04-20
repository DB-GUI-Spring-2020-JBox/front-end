
import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class AccountRepository {

    login(email, password) {
        axios.post(`${hostname}/login`, { email, password })
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
        axios.post(`${hostname}/register`, { name: `${firstName} ${lastName}`, email, password })
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