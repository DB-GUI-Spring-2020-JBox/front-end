import React from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleCard } from '../Articles';
import { feed } from '../SampleData/articles';

// Sample data

const categories = ["All Categories", "Health", "Tech", "Wealth"]

//export const Home = (props) => {
  export class Home extends React.Component {

    state = {
      category: 'All Categories',
      articles: []
    }

    featured = feed[0];
    firstRow = feed.slice(1,5);
    secondRow = feed.slice(6,10);

    render () {
      return <>
        {sessionStorage.getItem("isAuthenticated") !== "true" &&
          (<Redirect to="/login"/>)}
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>

          <div className="latest-stories">
            <div className = "row" style={{marginTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <h1>Latest Stories</h1>
              <div className="dropdown" style={{paddingTop: '10px'}} >
        				<button className="btn dropdown-toggle" type="button" data-toggle="dropdown">
      						{this.state.category}
        					<span className="caret"></span></button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    { categories.map((d, i) => <button className="dropdown-item" onClick={ e => this.setState({ category: d })} key={i}>{ d }</button> ) }
      	  				</div>
      					</div>
            </div>
          </div>
          <div className="container-fluid" style={{marginTop: '4em', justifyContent: 'space-between'}}>
            <div>
                <ArticleCard title={ this.featured.title } image={ this.featured.image } snippet={ this.featured.snippet } author={ this.featured.author }
                    date={ this.featured.date } category={ this.featured.category }/>
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row">
            { this.firstRow.map((a, i) => {
                return <div className="col-sm-3">
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row">
            { this.secondRow.map((a, i) => {
                return <div className="col-sm-3">
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }
            </div>
          </div>



          <div className="personal-feed">
            <div className = "row" style={{marginTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <h1>Your Feed</h1>
            </div>
          </div>
          <div className="container-fluid" style={{marginTop: '4em', justifyContent: 'space-between'}}>
            <div>
              <ArticleCard title={ this.featured.title } image={ this.featured.image } snippet={ this.featured.snippet }
                  author={ this.featured.author } date={ this.featured.date } category={ this.featured.category }/>
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row">
            { this.firstRow.map((a, i) => {
                return <div className="col-sm-3">
                <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                    date={ a.date } category={ a.category } key={ i }/>
                  </div>})
            }
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row">
            { this.secondRow.map((a, i) => {
                return <div className="col-sm-3">
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                      </div>})
            }
            </div>
          </div>
          </div>
    </>;
  }
}

export default Home;
