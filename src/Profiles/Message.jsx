import React, { useState } from 'react';

export const Message = props => {

	const [isHover, setIsHover] = useState(false);

	return (
		<div key={`m${props.index}`} className={ "whole-message " + props.messageClass }>
			<div 
				className="alert alert-primary message"
				onMouseEnter={ () => setIsHover(true) }
				onMouseLeave={ () => setIsHover(false) }>
				{ props.msg.content }
			</div>

			<div className={ "text " + ((!isHover && "hide-date") || (isHover && "show-date"))}>
				{ new Date(props.msg.datePosted*1000).toLocaleDateString() }
			</div>
		</div>
	);
}