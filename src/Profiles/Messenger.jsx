import React from "react";
import { Redirect, Link } from "react-router-dom";

import {
  users as userList,
  messages as messageList,
} from "../SampleData/users";
import { MessagesList } from "./MessagesList";
import "./messages.css";

export class Messenger extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
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
			phone: {}
		}
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

		let sender = this.state.sender;
		let messages = messageList.filter(x => (x.sender === sender && x.recipient === id) || (x.sender === id && x.recipient === sender));
		messages.sort((a, b) => a.datePosted - b.datePosted);

		this.setState({ messages }, () => {
			this.updateMessages();
		});
	}

	componentDidMount() {
		if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return;
		}

		let sender = +sessionStorage.getItem("userId");

		let uniqueUsers = [];
		messageList.forEach(msg => {
			if(msg.sender === sender && !uniqueUsers.find(x => x.id === msg.recipient)) {
				uniqueUsers.push({id: msg.recipient, name: userList.find(x => x.id === msg.recipient).name});
			}
		});

		let messages = messageList.filter(x => (x.sender === sender && x.recipient === uniqueUsers[0].id) || (x.sender === uniqueUsers[0].id && x.recipient === sender));
		messages.sort((a, b) => a.datePosted - b.datePosted);

		this.setState({
			sender,
			recipient: uniqueUsers[0].id,
			recipientName: uniqueUsers[0].name,
			messages,
			uniqueUsers
		});
	}

	render() {
		if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return <Redirect to="/login" push />
		}

		const isPhone = this.props.dimensions.width < 1000;

		return (
			<div id="messenger" className="container row">
				{ isPhone &&
					<div className="dropdown">
					<button className="btn" type="button" data-toggle="dropdown" >
						<img src="https://pngimage.net/wp-content/uploads/2019/05/menu-hamburger-png-.png" alt="" width="30" height="20" style={{marginTop: "-10px"}}/>
						<span className="caret"></span></button>
						Conversations
					  	<div className="dropdown-menu drop" aria-labelledby="dropdownMenuButton" style={{border: "none", margin: "8px 0px 0px -20px", paddingRight: "5px", background: "rgb(54, 58, 63)"}}>
							{
								this.state.uniqueUsers.map(user => {
									return <Link
									to={ "/messenger/t/" + user.id }
									onClick={ () => this.onSwitchMessages(user.id, user.name) }
									className={ "dropdown-item " + (this.state.recipient === user.id ? "bg-light text-dark" : "") } >
									{user.name}
									</Link>})
							}
					</div>
					<hr className="my-0 bg-dark col-12" />
				  </div>
				}
				{ !isPhone &&
					<div id="sidebar" className="container col-3">
						<h2 id="conversation-header">Conversations</h2>
						<hr/>
						{
							this.state.uniqueUsers.map(user => {
							return <Link
								to={ "/messenger/t/" + user.id }
								onClick={ () => this.onSwitchMessages(user.id, user.name) }
								className={"btn btn-block " + (this.state.recipient === user.id ? "btn-primary" : "btn-secondary")}>{user.name}
							</Link>})
						}
					</div>
				}
				<div id="message-section" className={ "container " + (isPhone ? "" : "col-9") }>
					<section id="messenger-header" className="row">
						<h2 className={ isPhone ? "" : "col-8" }>{ this.state.recipientName }</h2>
						<div className={"pt-1 " + (isPhone ? "col-12" : "col-4") }>
							<Link
								className={"btn btn-warning " + (isPhone ? "btn-block" : "float-right") }
								to={ "/userprofile/" + this.state.recipient }>
								Go to Profile
							</Link>
							<span className="clearfix"></span>
						</div>
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

		// let recipientId = +this.props.match.params.recipientId;
		// if (recipientId !== this.state.recipient) {
		// 	this.onSwitchMessages(recipientId, userList.find(x => x.id === recipientId));
		// }

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
