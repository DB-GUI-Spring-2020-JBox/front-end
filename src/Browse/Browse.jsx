import React from 'react';
import { Redirect } from 'react-router-dom';
import './browse.css';
import { feed } from '../SampleData/articles';
import { ArticleCard } from '../Articles';



const categories = ["Health", "Technology", "Wealth", "Politics"]

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
          <div className="stories"> <p>Stories</p>

          { categories.map((category, j) =>
              <div>
                <h4>{ category }</h4>
              <div className="scrollmenu">
            { feed.map((a, i) => {
              if(a.category === category)
                return <div className="col-sm-6 col-md-6 col-lg-6 col-xl article-row"  style={{ padding: "0"}}>
                    <ArticleCard title={ a.title } image={ a.image } snippet={ a.snippet } author={ a.author }
                        date={ a.date } category={ a.category } key={ i }/>
                    </div>})
            }
              </div>
            </div>
          )}

          </div>
        </div>
    </>;
  }
}

export default Browse;
