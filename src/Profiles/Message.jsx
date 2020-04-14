import React, { useState } from 'react';

export const Message = props => {

	const [isHover, setIsHover] = useState(false);

	return (
		<div 
			key={`m${props.index}`} 
			className={ "whole-message " + props.messageClass }
			onMouseEnter={ () => setIsHover(true) }
			onMouseLeave={ () => setIsHover(false) }>
			<div 
				className="alert alert-primary message">
				{ props.msg.content }
			</div>

			<div className={ "text " + ((!isHover && "hide-date") || (isHover && "show-date"))}>
				{ props.messageClass === "sender" &&
					<span 
						className="btn btn-link edit-link" 
						onClick={ () => props.onEdit(props.index) }>Edit</span>
				}
				<span>{ new Date(props.msg.datePosted*1000).toLocaleDateString() }</span>
			</div>
		</div>
	);
}