import React from 'react';
import { Redirect } from 'react-router-dom';
import './browse.css';

const categories = ["All Categories", "Health", "Tech", "Wealth"]

export class Browse extends React.Component {

    state = {
      category: 'All Categories',
      feed: ''
    }

    render () {
      return <>
      {sessionStorage.getItem("isAuthenticated") !== "true" &&
        (<Redirect to="/login"/>)}
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
          <div className = "row-fluid"> <p>Browse All Stories</p>
            <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{ fontSize: "30px"}}>
                {this.state.category}
                <span className="caret"></span></button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: "30px"}}>
                  { categories.map((d, i) => <button className="dropdown-item" onClick={ e => this.setState({ category: d })} key={i}>{ d }</button> ) }
                </div>
              </div>
          </div>
        </div>
    </>;
  }
}

export default Browse;
