import React from 'react';
import { Redirect } from 'react-router-dom';
import './browse.css';
import { feed } from '../SampleData/articles';
import { ArticleCard } from '../Articles';
import { BrowseRepository } from '../Api/browseRepository';



const categories = ["Health", "Technology", "Wealth", "Politics"]

export class Browse extends React.Component {

    browseRepo = new BrowseRepository();

    state = {

    }

    render () {
      return <>
      {sessionStorage.getItem("isAuthenticated") !== "true" &&
        (<Redirect to="/login"/>)}
          <div className="stories container-fluid"> <p style={{paddingRight: '10vw', paddingLeft: '10vw', paddingTop: "30px"}}>Stories</p>
          { categories.map((category, j) =>
              <div style={{marginTop: "60px", marginLeft: "10vw"}}>
                <h2>{ category }</h2><br></br>
              <div className="scrollmenu" style={{marginRight: "0", marginLeft: "0"}}>

            {
              feed.map((a, i) => {
                if(a.category === category)
                  return <div className="article-row col-sm-6 col-md-6 col-lg-6 col-xl-4">
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }

              </div>
            </div>
          )}
        </div>
    </>;
  }

  getCategoryArticles(category) {
    return this.browseRepo.getArticles(category);
  }
}

export default Browse;
