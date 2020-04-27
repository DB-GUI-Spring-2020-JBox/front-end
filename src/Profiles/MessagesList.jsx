import React from 'react';

import { Message } from './Message';

export const MessagesList = props => {

	let messageBubbles = []

	for (let i = 0; i < props.messages.length; i++) {
		let newIndex = i;

		let messageClass;

		if (props.messages[i].sender === props.sender)
			messageClass = "sender";
		else
			messageClass = "recipient";

		let group = [];

		while (newIndex < props.messages.length && props.messages[newIndex].sender === props.messages[i].sender) {
			let msg = props.messages[newIndex];

			group.push((
				<Message { ...{ msg, index: newIndex, messageClass, onEdit: index => props.onEdit(index) } } />
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

	return messageBubbles;
}