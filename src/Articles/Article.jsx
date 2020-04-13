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

    imgCheck() {
        if(this.state.article.image !== "null") {
          return <div id="article-image"><img src={ this.state.article.image } alt={ this.state.article.title } width="100%" height="auto"/></div>;
        }
    };

    componentWillMount() {
        let articleId = +this.props.match.params.articleId;
        if (articleId) {
            this.setState({ article: articles[0] });
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
                    <h4 id="article-author">By <a href={`/profiles/${ this.state.article.author.id }`}>{ this.state.article.author.name }</a></h4>
                    { this.imgCheck() }
                </section>
                <section id="article-body">
                    {
                        this.state.article.content.split('\n').map(p => <p>{ p }</p>)
                    }
                </section>
            </div>
        );
    }
};

export default Article;
