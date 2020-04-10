import React from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleCard } from '../Articles';
import { feed } from '../SampleData/articles';
import './home.css';

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
    secondRow = feed.slice(6,8);

    render () {
      return <>
        <div style={{background: "rgb(238, 238, 238)", paddingBottom: "3em"}}>
        {sessionStorage.getItem("isAuthenticated") !== "true" &&
          (<Redirect to="/login"/>)}
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>

          <div className="latest-stories">
            <div className = "row-fluid" style={{marginBottom: "-30px", paddingTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <p style={{fontSize: "50px", fontWeight: "40"}}>Latest Stories</p>
              <div className="dropdown" style={{paddingTop: '10px'}} >
        				<button className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{ fontSize: "30px"}}>
      						{this.state.category}
        					<span className="caret"></span></button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: "30px"}}>
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
            <div className="row" style={{overflow: "hidden"}}>
            { this.firstRow.map((a, i) => {
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 article-row" style={{ padding: "0"}}>
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row article-row">
            { this.secondRow.map((a, i) => {
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl article-row"  style={{ padding: "0"}}>
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }
            </div>
            <a className="see-all" href="/browse">see all ➞</a>
          </div>



          <div className="personal-feed">
            <div className = "row" style={{marginBottom: "-30px", marginTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <p style={{fontSize: "50px", fontWeight: "40"}}>Your Feed</p>
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
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 article-row" style={{ padding: "0"}}>
                <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                    date={ a.date } category={ a.category } key={ i }/>
                  </div>})
            }
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row">
            { this.secondRow.map((a, i) => {
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl article-row" style={{ padding: "0"}}>
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                      </div>})
            }
            </div>
          </div>
          <a className="see-all" href="/browse">see all ➞</a>
        </div>
      </div>
    </>;
  }
}

export default Home;
