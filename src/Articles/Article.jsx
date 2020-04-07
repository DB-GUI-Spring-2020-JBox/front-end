import React from 'react';

import { articles } from '../SampleData/articles'
import './article.css';

export class Article extends React.Component {

    state = {
        article: {
            title: "",
            content: "",
            author: {
                id: "",
                name: ""
            }
        }
    }

    render() {
        return (
            <div id="article" className="container bg-white">
                <section id="article-title">
                    <h1>{ this.state.article.title }</h1>
                    <hr />
                </section>
                <section id="article-body">
                    <p>{ this.state.article.content }</p>
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