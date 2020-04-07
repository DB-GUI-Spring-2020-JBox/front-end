import React from 'react';
import { Redirect } from 'react-router-dom';
import './search.css';

//export const Home = (props) => {
  export class Search extends React.Component {

    // if (!sessionStorage.getItem('isAuthenticated')) {
    //     return <Redirect to="/login"/>;
    // }

    state = {

    }


    render () {
      return <>
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
          <div className="feed-stories">
            <div className = "row" style={{marginTop: '4em', display: 'flex', justifyContent: 'space-between'}}> <h1>Search</h1>
            </div>
          </div>
      </div>
    </>;
  }
}

export default Search;
