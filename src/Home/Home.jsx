import React from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleCard } from '../Articles';

// Sample data

const articles = [
    {
        title: "Article 1 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "Billy Bob"
    },
    {
        title: "Article 2 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "John Smith"
    },
    {
        title: "Article 3 Title",
        image: "https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "Sally Seaborn"
    },
]

export const Home = (props) => {
    if (!props.isAuthenticated) {
        return <Redirect to="/login"/>;
    }

    return (
        <div className="container">
            <section>
                {
                articles.map(article => {
                    return <ArticleCard
                        title={ article.title }
                        image={ article.image }
                        snippet={ article.snippet }
                        author={ article.author }/>})
                }
            </section>
        </div>
    );
}

export default Home;
