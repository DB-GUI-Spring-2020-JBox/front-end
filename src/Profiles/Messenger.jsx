import React from "react";
import { Redirect, Link } from "react-router-dom";

import { MessagesList } from "./MessagesList";
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
			uniqueUsers: []
		}
	}

	messagesRepository = new MessagesRepository();
	accountRepository = new AccountRepository();

	async onEdit(index) {
		this.setState({ editMessage: index, currentMessage: this.state.messages.find(x => x.ID === index).content });
	}

	async sendMessage(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
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

		this.updateMessages();

		this.setState({ currentMessage: "" });
	}

	async updateMessages() {

		const sender = this.state.sender;

		let uniqueUsers = [];

		const messageList = await this.messagesRepository.getMessages(+sessionStorage.getItem("userId"));

		let userId;
		messageList.forEach(msg => {
			userId = undefined;
			if(msg.receiver !== sender && !uniqueUsers.find(x => (x.ID === msg.receiver))) {
				userId = msg.receiver;
			}
			else if (msg.sender !== sender && !uniqueUsers.find(x => (x.ID === msg.sender))) {
				userId = msg.sender;
			}

			if (userId) {
				let name = this.state.profiles.find(x => x.ID === userId).name;
				uniqueUsers.push({ID: userId, name });
			}

		});

		messageList.sort((a, b) => a.datePosted - b.datePosted);
		
		if (uniqueUsers.length > 0) {
			this.setState({
				recipient: uniqueUsers[0].ID,
				recipientName: uniqueUsers[0].name,
			});
		}

		this.setState({
			messages: messageList,
			uniqueUsers
		});

		this.setState({
			messagesJSX: <MessagesList
							messages={ this.state.messages }
							sender={this.state.sender}
							recipient={this.state.recipient}
							onEdit={ index => this.onEdit(index) } /> });
	}

	onSwitchMessages(id, name) {

		this.setState({ recipient: id, recipientName: name })

		this.updateMessages();
	}

	async loadProfiles() {
		const profiles = await this.accountRepository.getProfiles();
		this.setState({ profiles });
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
							this.state.uniqueUsers.map(user => {
							return <Link
								to={ "/messenger/t/" + user.ID }
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
				<div id="message-section" className={ "container " + (isPhone ? "" : "col-9") }>
					<section id="messenger-header" className="row">
						<h2 className={ isPhone ? "" : "col-8" }>{ this.state.recipientName }</h2>
						<div className={"pt-1 " + (isPhone ? "col-12" : "col-4") }>
							{ !isNaN(this.state.recipient) &&
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
									readOnly={ isNaN(this.state.recipient) ? "true" : "false" }
									autoFocus/>
								<button
									id="send-button"
									type="button"
									className="btn btn-primary"
									disabled={ isNaN(this.state.recipient) ? "true" : "false" }
									onClick= { () => this.sendMessage() }>Send</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		);
	}

	async componentDidMount() {

		// let recipientId = +this.props.match.params.recipientId;
		// if (recipientId !== this.state.recipient) {
		// 	this.onSwitchMessages(recipientId, userList.find(x => x.id === recipientId));
		// }

		if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return;
		}

		let sender = +sessionStorage.getItem("userId");
		this.setState({ sender });

		await this.loadProfiles();

		await this.updateMessages();
	}

	componentDidUpdate() {

		let box = document.getElementById('message-list');
		box.scrollTop = box.scrollHeight;
	}
}
