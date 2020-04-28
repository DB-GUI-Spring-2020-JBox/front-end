import React from 'react';
import { Link } from "react-router-dom";
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
        <a className="card" style={{color: "black", textDecoration: "none"}} href={`/articles/${props.id}`}>
            {imgCheck()}
            <div className="text-center" style={{ fontSize: "23px", marginTop: "9px" }}><i>{ props.category }</i></div>
            <div className="text-center" style={{ fontSize: "30px", marginBottom: "100px", padding: "10px", whiteSpace: "normal"}}>{ props.title}</div>
            <div className="text-center" style={{ fontSize: "20px", position: "absolute", bottom: "35px", width: "100%"}}><i>by </i>
                <b style={{ color: "rgb(25, 161, 230)", textDecoration: "none" }} href={`/userprofile/${ props.authorId }`}>{ props.author }</b> - <i>{ new Date(props.date).toLocaleString('default', dateOptions) }</i></div>
            <hr style={{border: "lightgray solid 2px", position: "absolute", bottom: "5px", width: "85%", left: "7%"}}/>
        </a>
    );
}

export default ArticleCard;
