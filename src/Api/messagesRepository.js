
import { hostname } from './repositoryConfig';
import axios from 'axios';

function error(err) {
    console.error(err);
    alert("Error:\n" + err);
}

export class MessagesRepository {

    getMessages(userId) {
        axios.get(`${hostname}/api/messages`, { params: { userId } })
            .then(response => {
                return response;
            })
            .catch(err => {
                error(err);
            });
    }

    sendMessage(message) {
        axios.post(`${hostname}/api/messages`, { message })
            .then(response => {
                return response;
            })
            .catch(err => {
                error(err);
            });
    }

    editMessage(message) {
        axios.put(`${hostname}/api/messages`, { message })
            .then(response => {
                return response;
            })
            .catch(err => {
                error(err);
            });
    }
}

export default MessagesRepository;