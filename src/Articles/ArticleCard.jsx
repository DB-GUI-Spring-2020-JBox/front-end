import React from 'react';

//TO DO - Fix sizing so its relative to the div around
export const ArticleCard = props => {
    return (
        <div className="card my-4">
            <div className="card-header">{ props.title }</div>
            <div className="card-img"><img src={ props.image } alt={ props.title } width="200" height="120"/></div>
            <div className="card-body">{ props.snippet }</div>
            <div className="card-footer"><i>By</i> <b>{ props.author }</b>  <i>{ props.date }</i></div>
        </div>
    );
}

export default ArticleCard;
