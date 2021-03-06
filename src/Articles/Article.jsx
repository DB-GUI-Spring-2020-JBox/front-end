import React from 'react';
import './article.css';
import { ArticleRepository } from '../Api/articleRepository';

const dateOptions = {
  month: '2-digit',
  day: '2-digit',
  year: '2-digit',
  hour: '2-digit',
  hour12: true,
  minute: '2-digit'
}

export class Article extends React.Component {

    articleRepo = new ArticleRepository();

    state = {
        article: {
            ID: '',
            title: '',
            content: '',
            author: '',
            price: '',
            datePosted: '',
            dateUpdated: '',
            image: '',
            category: ""
        }
    }

    imgCheck() {
        if(this.state.article.image !== "null") {
          return <div id="article-image"><img src={ this.state.article.image } alt={ this.state.article.title } width="100%" height="auto"/></div>;
        }
    };

    componentDidMount() {
      let articleId = +this.props.match.params.articleId;
      if(articleId){
        this.articleRepo.getFeed(articleId)
          .then(articles => this.setState({ article: articles[0] }));
      }
    }

    render() {
        return (
            <div id="article" className="container bg-white">
                <section id="article-header">
                    <h5 className="badge badge-info" id="article-category">{ this.state.article.category.toUpperCase() }</h5>
                    <h1>{ this.state.article.title }</h1>
                    <hr />
                    <div id="article-date">
                      <h5 id="article-date-left">Posted: { new Date(this.state.article.datePosted).toLocaleString('default', dateOptions) }</h5>
                      <h5 id="article-date-right">Updated: { new Date(this.state.article.dateUpdated).toLocaleString('default', dateOptions) }</h5>
                    </div> <br></br>
                    <h4 id="article-author">By <a href={`/userprofile/${ this.state.article.authorId }`}>{ this.state.article.authorName }</a></h4>
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
