
import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class MessagesRepository {

    getMessages(userId) {
        return new Promise((resolve, reject) => {
            axios.get(`${hostname}/api/messagesSender/${userId}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
            });
        })
    }

    sendMessage(message) {
        return new Promise((resolve, reject) => {
            axios.post(`${hostname}/api/messages`, { ...message })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
            });
        });
    }

    editMessage(message) {
        return new Promise((resolve, reject) => {
            axios.put(`${hostname}/api/messages/${message.ID}`, { content: message.content })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    error(err);
            });
        });
    }
}

export default MessagesRepository;
