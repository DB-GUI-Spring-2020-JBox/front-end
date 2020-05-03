import React from 'react';
import '../Home/home.css';

const dateOptions = {
  month: '2-digit',
  day: '2-digit',
  year: '2-digit'
}

//TO DO - Fix sizing so its relative to the div around
export const ArticleCard = props => {
  function imgCheck(){
    if(props.image !== "null") {
      return <div className="text-center"><img src={ props.image } alt={ props.title } width="100%" height="auto"/></div>;
    }
  };
    return (
        <a className="card card-link" href={`/articles/${props.id}`}>
            {imgCheck()}
            <div className="category-sec"><i>{ `${props.category}`.toUpperCase() }</i></div>
            <div className="title-sec">{ props.title }</div>
            <div className="author-sec"><i>by </i>
                <b href={`/userprofile/${ props.authorId }`}>{ props.author }</b> - <i>{ new Date(props.date).toLocaleString('default', dateOptions) }</i></div>
            <hr/>
        </a>
    );
}

export default ArticleCard;
