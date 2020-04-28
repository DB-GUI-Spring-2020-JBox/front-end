import React from "react";
import { Redirect, Link } from "react-router-dom";

import { Message } from "./Message";
import "./messages.css";
import MessagesRepository from "../Api/messagesRepository";
import AccountRepository from "../Api/accountRepository";

export class Messenger extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sender: "",
			recipient: undefined,
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
			phone: {},
			profiles: [],
			uniqueUsers: [],
			blocked: [],
			hasMessages: false
		}
	}

	messagesRepository = new MessagesRepository();
	accountRepository = new AccountRepository();

	onEdit(index) {
		this.setState({ editMessage: index, currentMessage: this.state.messages.find(x => x.ID === index).content });
	}

	hasMessages(status) {
		this.setState({ hasMessages: status });
		let i = this.state.hasMessages;
	}

	async sendMessage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (this.state.currentMessage === "") {
			return;
		}

		if (this.state.editMessage >= 0) {
			await this.messagesRepository.editMessage({ ID: this.state.editMessage, content: this.state.currentMessage });
			this.setState({ editMessage: undefined });
		}
		else {
			await this.messagesRepository.sendMessage({
				sender: this.state.sender,
				receiver: this.state.recipient,
				datePosted: new Date() / 1000,
				content: this.state.currentMessage
			});
		}

		await this.updateMessages();

		this.updateMessagesJSX();

		this.setState({ currentMessage: "" });
	}

	async updateMessages() {

		const messageList = await this.messagesRepository.getMessages(+sessionStorage.getItem("userId"));

		messageList.sort((a, b) => a.datePosted - b.datePosted);
		
		this.setState({
			messages: messageList,
		});
	}

	generateMessagesJSX() {
		let messageBubbles = []

		if (!this.state.messages.find(x => (x.receiver === this.state.recipient || x.sender === this.state.recipient))) {
			this.hasMessages(false);
			return messageBubbles;
		}
	
		for (let i = 0; i < this.state.messages.length; i++) {
			let newIndex = i;
	
			let messageClass;
	
			if (this.state.messages[i].sender === this.state.sender)
				messageClass = "sender";
			else
				messageClass = "recipient";
	
			let group = [];
	
			while (newIndex < this.state.messages.length && this.state.messages[newIndex].sender === this.state.messages[i].sender) {
				let msg = this.state.messages[newIndex];
				if (!((msg.sender === this.state.sender && msg.receiver === this.state.recipient) || 
					(msg.sender === this.state.recipient && msg.receiver === this.state.sender))) {
					newIndex += 1;
					continue;
				}
	
				group.push((
					<Message { ...{ msg, index: newIndex, messageClass, onEdit: index => this.onEdit(index) } } />
				));
	
				newIndex += 1;
			}
	
			i = newIndex - 1;
	
			messageBubbles.push(
				<div className={'message-group ' + messageClass }>
						{ group }
				</div>
			);
		}
	
		this.hasMessages(true);
	
		return messageBubbles;
	}

	updateMessagesJSX() {
		const messagesJSX = this.generateMessagesJSX();
		this.setState({
			messagesJSX });
	}

	onSwitchMessages(id, name) {

		this.setState({ recipient: id, recipientName: name })

		this.updateMessages().then(() => this.updateMessagesJSX());
	}

	async loadProfiles() {
		const profiles = await this.accountRepository.getProfiles();
		this.setState({ profiles });
	}

	isBlocked(blocked) {
		return this.state.blocked.find(x => x.blocker === +sessionStorage.getItem("userId") && x.blocked === blocked);
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
									to={ "/messenger/t/" + user.ID }
									onClick={ () => this.onSwitchMessages(user.ID, user.name) }
									className={ "dropdown-item " + (this.state.recipient === user.ID ? "bg-light text-dark" : "") } >
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
							this.state.uniqueUsers.map((user, i) => {
							return <Link
								to={ "/messenger/t/" + user.ID }
								key={ i }
								onClick={ () => this.onSwitchMessages(user.ID, user.name) }
								className={"btn btn-block " + (this.state.recipient === user.ID ? "btn-primary" : "btn-secondary")}>{user.name}
							</Link>})
						}
						{
							!(this.state.uniqueUsers.length > 0) &&
							<h5 className="text-secondary">No conversations</h5>
						}
					</div>
				}
				<div id="message-section" className={ "container " + (isPhone ? "" : "col-9") }
				
				style={(this.state.uniqueUsers.length > 0) ? {} : { visibility: "hidden" }}>
					<section 
						id="messenger-header" 
						className="row" >
						<div className={ "d-flex flex-row " + (isPhone ? "" : "col-8") }>
							<h2>
								{ this.state.recipientName }
							</h2>
							{ this.isBlocked(this.state.recipient) &&
								<span className="text-danger mt-2 pl-3"><h5 className="d-inline">(Blocked by you)</h5></span> }
						</div>
						<div className={"pt-1 " + (isPhone ? "col-12" : "col-4") }>
							{ this.state.uniqueUsers.length > 0 &&
							<>
							<Link 
								className={"btn btn-warning " + (isPhone ? "btn-block" : "float-right") }
								to={ "/userprofile/" + this.state.recipient }>
								Go to Profile
							</Link>
							<span className="clearfix"></span>
							</>
							}
						</div>
					</section>
					<section id="message-list">
						{ this.state.hasMessages &&
						this.state.messagesJSX 
						}

						{ !this.state.hasMessages &&
							<h5 className="text-muted text-center">
								Send your first message!
							</h5>
						}
					</section>
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

	async componentDidMount() {

		if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return;
		}

		let sender = +sessionStorage.getItem("userId");
		this.setState({ sender });

		await this.loadProfiles();

		await this.updateMessages();

		let uniqueUsers = [];

		const blocked = await this.accountRepository.getBlocked(sender);
		this.setState({ blocked });

		let userId;
		this.state.messages.forEach(msg => {
			userId = undefined;
			if(msg.receiver !== sender && !uniqueUsers.find(x => (x.ID === msg.receiver))) {
				userId = msg.receiver;
			}
			else if (msg.sender !== sender && !uniqueUsers.find(x => (x.ID === msg.sender))) {
				userId = msg.sender;
			}

			if (userId && !blocked.find(x => x.blocker === userId && x.blocked === sender)) {
				let name = this.state.profiles.find(x => x.ID === userId).name;
				uniqueUsers.push({ID: userId, name });
			}

		});

		if (uniqueUsers.length > 0) {
			this.setState({
				recipient: uniqueUsers[0].ID,
				recipientName: uniqueUsers[0].name,
			});
		}

		let recipientId = +this.props.match.params.recipientId;
		let recipientName;

		if (recipientId) {
			let profile = this.state.profiles.find(x => x.ID === recipientId);
			if (!uniqueUsers.find(x => x.ID === recipientId)) {
				if (profile && !blocked.find(x => x.blocker === recipientId && x.blocked === sender)) {
					uniqueUsers.push({ ID: profile.ID, name: profile.name });
				}
				else {
					if (uniqueUsers.length > 0) {
						recipientId = uniqueUsers[0].ID;
						recipientName = uniqueUsers[0].name;
					}
				}
			}
			if (profile) {
				recipientName = profile.name;
			}
			this.setState({ recipient: recipientId, recipientName });
		}

		this.setState({ uniqueUsers });

		this.updateMessagesJSX();
		
	}

	componentDidUpdate() {

		let box = document.getElementById('message-list');
		box.scrollTop = box.scrollHeight;
	}
}
