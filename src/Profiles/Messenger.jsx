
import React from 'react';

import { users as userList, messages as messageList } from '../SampleData/users';
import { MessagesList } from './MessagesList';
import './messages.css';
import { Redirect } from 'react-router-dom';

export class Messenger extends React.Component {

	state = {
		sender: "userid",
		recipient: "userid",
		recipientName: "",
		messages: [
			{
				sender: "",
				recipient: "",
				datePosted: "",
				content: ""
			}
		],
		currentMessage: "",
		messagesJSX: "",
	}

	onEdit(index) {
		this.setState({ editMessage: index, currentMessage: this.state.messages[index].content });
	}

	sendMessage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		
		let messages = this.state.messages;

		if (this.state.editMessage >= 0) {
			messages[this.state.editMessage].content = this.state.currentMessage;
			this.setState({ editMessage: undefined });
		}
		else {
			messages.push({
				sender: this.state.sender,
				recipient: this.state.recipient,
				datePosted: new Date() / 1000,
				content: this.state.currentMessage
			});
		}

		this.setState({ 
			messagesJSX: <MessagesList 
							messages={ this.state.messages } 
							sender={this.state.sender}
							onEdit={ index => this.onEdit(index) } /> })

		this.setState({ currentMessage: "" });
	}

	componentWillMount() {
		let sender = +sessionStorage.getItem("userId");
		let recipient = +this.props.match.params.recipientId;
		let messages = messageList.filter(x => (x.sender === sender && x.recipient === recipient) || (x.sender === recipient && x.recipient === sender));
		messages.sort((a, b) => a.datePosted - b.datePosted);
		let recipientName = userList.find(x => x.id === recipient).name;

		this.setState({
			sender,
			recipient,
			recipientName,
			messages
		});
	}

	render() {
		return (
			<div id="messenger" className="container">
				{ sessionStorage.getItem("isAuthenticated") !== "true" &&
				<Redirect to="/login" push /> }

				<section id="messenger-header">
					<h2>{ this.state.recipientName }</h2>
				</section>
				<section id="message-list">{ this.state.messagesJSX }</section>
				<section id="chat-box">
					<form>
						<div className="row form-group">
							<textarea 
								id="chat-textarea"
								className="form-control col-11"
								type="text"
								value={ this.state.currentMessage }
								onChange={ e => this.setState({ currentMessage: e.target.value }) }
								onKeyPress={e => {
									if (e.keyCode === 13 || e.which === 13) {
										this.sendMessage(e)
									}
								}}
								autoFocus/>
							<button
								id="send-button"
								type="button"
								className="btn btn-primary"
								onClick= { () => this.sendMessage() }>Send</button>
						</div>
					</form>
				</section>
			</div>
		);
	}

	componentDidMount() {
		this.setState({ 
			messagesJSX: <MessagesList 
							messages={ this.state.messages } 
							sender={this.state.sender}
							onEdit={ index => this.onEdit(index) } /> });
	}

	componentDidUpdate() {
		let box = document.getElementById('message-list');
		box.scrollTop = box.scrollHeight;
	}
}