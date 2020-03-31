import React from 'react';
import { Redirect } from 'react-router-dom';
import { ArticleCard } from '../Articles';

// Sample data

const articles = [
    {
        title: "Article 1 Title",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "Billy Bob"
    },
    {
        title: "Article 2 Title",
        snippet: "Here is a sample snippet for an article that would show up on the home page.",
        author: "John Smith"
    },
    {
        title: "Article 3 Title",
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
                        snippet={ article.snippet } 
                        author={ article.author }/>})
                }
            </section>
        </div>
    );
}

export default Home;