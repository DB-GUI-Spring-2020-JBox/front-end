import React from 'react';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ArticleCard } from '../Articles';

// Sample data

const categories = ["All Categories", "Health", "Technology", "Wealth"]

const articles = [
    {
        title: "Article 1 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "Billy Bob",
        date: "April 7, 2020",
        category: "Technology"
    },
    {
        title: "Article 2 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "John Smith",
        date: "April 7, 2020",
        category: "Health"
    },
    {
        title: "Article 3 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "Sally Seaborn",
        date: "April 7, 2020",
        category: "Wealth"
    },
]

//export const Home = (props) => {
  export class Home extends React.Component {

    // if (!sessionStorage.getItem('isAuthenticated')) {
    //     return <Redirect to="/login"/>;
    // }

    state = {
      category: 'All Categories',
      articles: []
    }


    render () {
      return <>
        <div className="container-fluid" style={{paddingRight: '10vw', paddingLeft: '10vw'}}>
          <div className="latest-stories">
            <div className = "row" style={{marginTop: '5em', display: 'flex', justifyContent: 'space-between'}}> <h1>Latest Stories</h1>
              <div class="dropdown" style={{paddingTop: '10px'}} >
        				<button class="btn dropdown-toggle" type="button" data-toggle="dropdown">
      						{this.state.category}
        					<span class="caret"></span></button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    { categories.map((d, i) => <button class="dropdown-item">{ d }</button> ) }
      	  				</div>
      					</div>
            </div>
          </div>
            <section>
                { this.state.category === "All Categories" &&
                articles.map((a, i) =>
                    <ArticleCard
                        title={ a.title }
                        image={ a.image }
                        snippet={ a.snippet }
                        author={ a.author }
                        date={ a.date }/>)
               }
                { this.state.category.length > 0 &&
                  articles.map(article => {
                    if(this.state.category === article.category)
                      return <ArticleCard
                          title={ article.title }
                          image={ article.image }
                          snippet={ article.snippet }
                          author={ article.author }
                          date={ article.date }/>})
                }
            </section>

            <div className="feed-stories">
              <div className = "row" style={{marginTop: '4em', display: 'flex', justifyContent: 'space-between'}}> <h1>Your Feed</h1>

              </div>
            </div>
          </div>
    </>;
  }
}

export default Home;
