
import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class AccountRepository {

    profiles() {
        return new Promise((resolve, reject) => {
            axios.get('/api/profiles')
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    }

    profile(id) {
        return new Promise((resolve, reject) => {
            axios.get('/api/profilesUser/' + id)
                .then(response => {
                    resolve(response.data[0]);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', { username, password })
                .then(response => {
                    resolve({ status: true, account: response.data.account });
                })
                .catch(err => {
                    error(err);
                    resolve({ status: false });
                });
        });
    }

    register(firstName, lastName, email, password) {
        return new Promise((resolve, reject) => {
            axios.post('/api/register', { name: `${firstName} ${lastName}`, email, password })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }
}

export default AccountRepository;