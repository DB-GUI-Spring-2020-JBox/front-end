import { hostname } from './repositoryConfig';

import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class AccountRepository {

    getProfiles() {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/profiles')
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    }

    getProfile(id) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/profilesUser/' + id)
                .then(response => {
                    resolve(response.data[0]);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    }

    updateProfile(id, profile) {
        return new Promise((resolve, reject) => {
            axios.put(hostname + '/api/profiles/' + id, { ...profile })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    }

    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/login', { username, password })
                .then(response => {
                    resolve({ status: response.data.status, account: response.data.account });
                })
                .catch(err => {
                    error(err);
                    resolve({ status: false });
                });
        });
    }

    register(account) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/register', { ...account })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    follow(followerId, followedId) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/follows', { follower: followerId, followed: followedId })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    unFollow(followerId, followedId) {
        return new Promise((resolve, reject) => {
            axios.delete(hostname + '/api/follows', { params: { follower: followerId, followed: followedId } })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    doesFollow(followerId, followedId) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/followerByID', { params: { follower: followerId } })
                .then(response => {
                    if (response.data && response.data.find(x => x.followed === followedId)) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    block(blocker, blocked) {
        return new Promise((resolve, reject) => {
            axios.post(hostname + '/api/blocks', { blocker, blocked })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    unBlock(blocker, blocked) {
        return new Promise((resolve, reject) => {
            axios.delete(hostname + '/api/blocks', { params: { blocker, blocked } })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    isBlocked(blocker, blocked) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/blocks', { params: { blocker, blocked } })
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                })
                .catch(err => {
                    error(err);
                    resolve(undefined);
                });
        });
    }

    getBlocked(blocker) {
        return new Promise((resolve, reject) => {
            axios.get(hostname + '/api/blocks', { params: { blocker } })
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
