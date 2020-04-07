import React from 'react';

export const ArticleCard = props => {
    return (
        <div className="card my-4">
            <div className="card-header">{ props.title }</div>
            <div className="card-img"><img src={ props.image } alt={ props.title } width="200" height="120"/></div>
            <div className="card-body">{ props.snippet }</div>
            <div className="card-footer">By { props.author }</div>
        </div>
    );
}

export default ArticleCard;
