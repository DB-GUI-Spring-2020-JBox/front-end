import React from 'react';

import { articles } from '../SampleData/articles'
import './article.css';

export class Article extends React.Component {

    state = {
        article: {
            title: "",
            content: "",
            date: "",
            author: {
                id: "",
                name: ""
            },
            category: ""
        }
    }

    render() {
        return (
            <div id="article" className="container bg-white">
                <section id="article-header">
                    <h5 className="badge badge-info" id="article-category">{ this.state.article.category.toUpperCase() }</h5>
                    <h1>{ this.state.article.title }</h1>
                    <hr />
                    <h5 id="article-date">{ this.state.article.date }</h5>
                    <h4 id="article-author">By { this.state.article.author.name }</h4>
                </section>
                <section id="article-body">
                    {
                        this.state.article.content.split('\n').map((p, i) => <p>{ p }</p>)
                    }
                </section>
            </div>
        );
    }

    componentDidMount() {
        let articleId = +this.props.match.params.articleId;
        if (articleId) {
            this.setState({ article: articles[0] });
        }
    }

};

export default Article;