import React from 'react';
import { Redirect } from 'react-router-dom';
import './browse.css';
import { ArticleCard } from '../Articles';
import { HomeRepository } from '../Api/homeRepository';



const categories = ["Health", "Technology", "Wealth", "Politics"]

export class Browse extends React.Component {

    homeRepo = new HomeRepository();

    state = {
      health: [],
      tech: [],
      wealth: [],
      politics: []
    }


    render () {
      return <>
      {sessionStorage.getItem("isAuthenticated") !== "true" &&
        (<Redirect to="/login"/>)}
          <div className="container-fluid"> <p className="stories" style={{paddingRight: '10vw', paddingLeft: '10vw', paddingTop: "30px"}}>Stories</p>
          <div style={{marginTop: "60px", marginLeft: "10vw"}}>
            <p className="category-header">{ categories[0] }</p><br></br>
          <div className="scrollmenu" style={{marginRight: "0", marginLeft: "0"}}>
                  { this.displayArticles(this.state.health, categories[0]) }
                  </div></div>
                  <div style={{marginTop: "60px", marginLeft: "10vw"}}>
                    <p className="category-header">{ categories[1] }</p><br></br>
                  <div className="scrollmenu" style={{marginRight: "0", marginLeft: "0"}}>
                  { this.displayArticles(this.state.tech, categories[1]) }
                  </div></div>
                  <div style={{marginTop: "60px", marginLeft: "10vw"}}>
                    <p className="category-header">{ categories[2]  }</p><br></br>
                  <div className="scrollmenu" style={{marginRight: "0", marginLeft: "0"}}>
                  { this.displayArticles(this.state.wealth, categories[2]) }
                  </div></div>
                  <div style={{marginTop: "60px", marginLeft: "10vw"}}>
                    <p className="category-header">{ categories[3] }</p><br></br>
                  <div className="scrollmenu" style={{marginRight: "0", marginLeft: "0"}}>
                  { this.displayArticles(this.state.politics, categories[3]) }
                  </div></div>
        </div>
    </>;
  }

  componentDidMount() {
    this.homeRepo.getArticles("health").then(articles => this.setState({ health: articles }))
    this.homeRepo.getArticles("Technology").then(articles => this.setState({ tech: articles }))
    this.homeRepo.getArticles("politics").then(articles => this.setState({ politics: articles }))
    this.homeRepo.getArticles("wealth").then(articles => this.setState({ wealth: articles }))
  }

  displayArticles(articles, category) {
    let list = [];

    articles.map((a, i) =>
    list.push(<div className="article-row col-sm-6 col-md-6 col-lg-6 col-xl-4">
              {console.log(i)}
              <ArticleCard authorid={ a.authorId } id={ a.ID } title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                  date={ a.datePosted } category={ a.category }/>
            </div> ));
    return list;
  }

  getCategoryArticles(category) {
    this.homeRepo.getArticles(category).then(art => this.setState({category: art}))
  }

  // getCategoryArticles(category) {
  //   console.log("CATEGORY " + category)
  //   return this.homeRepo.getArticles(category);
  // }
}

export default Browse;
