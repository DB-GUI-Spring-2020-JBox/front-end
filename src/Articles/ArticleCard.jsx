import React from 'react';

export const ArticleCard = props => {
    return (
        <div className="card my-4">
            <div className="card-header">{ props.title }</div>
            <div className="card-body">{ props.snippet }</div>
            <div className="card-footer">By { props.author }</div>
        </div>
    );
}

export default ArticleCard;