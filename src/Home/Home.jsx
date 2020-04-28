import React from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleCard } from '../Articles';
import { feed } from '../SampleData/articles';
import { HomeRepository } from '../Api/homeRepository';
import './home.css';

const categories = ["All Categories", "Health", "Tech", "Wealth", "Politics"]

//export const Home = (props) => {
  export class Home extends React.Component {

    homeRepo = new HomeRepository();

    state = {
      featured: [],
      firstRow: [],
      secondRow: [],
      userFeed: []
    };

    render () {
      return <>
        <div style={{background: "rgb(238, 238, 238)", paddingBottom: "3em"}}>
         {sessionStorage.getItem("isAuthenticated") !== "true" &&
          (<Redirect to="/login"/>)}
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>

            <div className = "row-fluid latest-stories" style={{marginBottom: "-30px", paddingTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <p style={{fontSize: "50px", fontWeight: "40"}}>Latest Stories</p>
              <div className="dropdown" style={{paddingTop: '25px'}} >
        				<button className="btn dropdown-toggle" type="button" data-toggle="dropdown" style={{ fontSize: "22.5px"}}>
      						{ this.state.category }
        					<span className="caret"></span></button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ fontSize: "22.5px"}}>
                    { categories.map((d, i) => <button className="dropdown-item" onClick={ e => this.setState({ category: d })} key={i}>{ d }</button> ) }
      	  				</div>
      					</div>
            </div>
          <div className="container-fluid" style={{marginTop: '4em', justifyContent: 'space-between'}}>
            <div>
                <ArticleCard authorid={ this.state.featured.authorId } id={ this.state.featured.ID } title={ this.state.featured.title } image={ this.state.featured.image } snippet={ this.state.featured.snippet } author={ this.state.featured.author }
                    date={ this.state.featured.datePosted } category={ this.state.featured.category }/>
            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row" style={{overflow: "hidden"}}>

            {
              this.state.firstRow.map((a, i) => {
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3 article-row" style={{ padding: "0"}}>
                    <ArticleCard authorid={ a.authorId } id={a.ID} title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.datePosted } category={ a.category } key={ i }/>
                    </div>})
            }

            </div>
          </div>
          <div className="container-fluid bg-3">
            <div className="row article-row">

            {
              this.state.secondRow.map((a, i) => {
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl article-row"  style={{ padding: "0"}}>
                    <ArticleCard authorid={ a.authorId } id={a.ID} title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.datePosted } category={ a.category } key={ i }/>
                    </div>})
            }

            </div>
            <a className="see-all" href="/browse">see all ➞</a>
          </div>
          <div className = "row personal-feed" style={{marginTop: '6em', marginBottom: "1em"}}> <p style={{fontSize: "50px", fontWeight: "40"}}>Your Feed</p></div>
          </div>
        <div className="scrollmenu">
        { this.state.userFeed.map((a, i) => {
          return <div className="article-row col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <ArticleCard authorid={ a.authorId } id={a.ID} title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                  date={ a.datePosted } category={ a.category } key={ i }/>
              </div>})
        }
        </div>
      </div>
    </>;
  }

    componentDidMount() {
      this.homeRepo.getLatestArticles()
        .then(articles => this.setState({ featured: articles[0], firstRow: articles.slice(1, 5), secondRow: articles.slice(6, 8) }));
      let userId = sessionStorage.getItem("userId");
      this.homeRepo.getFeed(userId)
        .then(articles => this.setState({ userFeed: articles }));
    }
}

export default Home;
