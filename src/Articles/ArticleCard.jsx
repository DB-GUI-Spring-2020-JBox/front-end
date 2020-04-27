import React from 'react';
import { Link } from "react-router-dom";
import '../Home/home.css';

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
            <div className="text-center" style={{ fontSize: "20px", position: "absolute", bottom: "35px", width: "100%"}}><i>by</i> <b>{ props.author }</b> - <i>{ props.date }</i></div>
            <hr style={{border: "lightgray solid 2px", position: "absolute", bottom: "5px", width: "85%", left: "7%"}}/>
        </a>
    );
}

export default ArticleCard;
