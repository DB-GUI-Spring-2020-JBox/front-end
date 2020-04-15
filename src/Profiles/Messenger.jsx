
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

		this.updateMessages();

		this.setState({ currentMessage: "" });
	}

	updateMessages() {
		this.setState({ 
			messagesJSX: <MessagesList 
							messages={ this.state.messages } 
							sender={this.state.sender}
							onEdit={ index => this.onEdit(index) } /> });
	}

	onSwitchMessages(id, name) {

		this.setState({ recipient: id, recipientName: name })

		let sender = +sessionStorage.getItem("userId");
		let messages = messageList.filter(x => (x.sender === sender && x.recipient === id) || (x.sender === id && x.recipient === sender));
		messages.sort((a, b) => a.datePosted - b.datePosted);

		this.setState({ messages });
		this.updateMessages();
	}

	componentWillMount() {
		let sender = +sessionStorage.getItem("userId");
		let recipient = +this.props.match.params.recipientId;
		let messages = messageList.filter(x => (x.sender === sender && x.recipient === recipient) || (x.sender === recipient && x.recipient === sender));
		messages.sort((a, b) => a.datePosted - b.datePosted);
		let recipientName = userList.find(x => x.id === recipient).name;

		let uniqueUsers = [];
		messageList.forEach(msg => {
			if(msg.sender === sender && !uniqueUsers.find(x => x.id === msg.recipient)) {
				uniqueUsers.push({id: msg.recipient, name: userList.find(x => x.id === msg.recipient).name});
			}
		});

		this.setState({
			sender,
			recipient,
			recipientName,
			messages,
			uniqueUsers
		});
	}

	render() {
		return (
			<div id="messenger" className="container row">
				<div id="sidebar" className="container col-4">
					{
						this.state.uniqueUsers.map(user => {
						return <div 
							onClick={ () => this.onSwitchMessages(user.id, user.name) } 
							className={"btn " + (this.state.recipient === user.id ? "btn-primary" : "btn-secondary")}>{user.name}
						</div>})
					}
					{/* <div className="btn btn-primary">{ this.state.recipientName }</div>
					<div className="btn btn-secondary">Other Name</div>
					<div className="btn btn-secondary">Other Name</div>
					<div className="btn btn-secondary">Other Name</div> */}
				</div>
				<div id="message-section" className="container col-8">
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
									className="form-control col-10"
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