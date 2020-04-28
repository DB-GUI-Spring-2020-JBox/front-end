import React from "react";
import { Link, Redirect } from "react-router-dom";
import ArticleRepository from "../Api/articleRepository";
//import "./postarticle.css";
//import Time from "react-time";

export class PostArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      //date: new Date(),
      author: +sessionStorage.getItem("userId"),
      category: "",
      image: "",
      button: {
        value: "Post Article",
        class: "btn-primary",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  articleRepository = new ArticleRepository();

  async handleClick() {

    if (this.state.edit) {
      const article = {
        ID: +this.props.match.params.articleId,
        title: this.state.title,
        image: this.state.image,
        content: this.state.content,
        author: this.state.author,
        category: this.state.category,
        date: this.state.date || new Date().toISOString()
      }
      debugger;
      await this.articleRepository.editArticle(article);
      this.setState({ redirect: true });
      return;
    }

    else {
      const article = {
        title: this.state.title,
        image: this.state.image,
        content: this.state.content,
        author: this.state.author,
        category: this.state.category,
        date: this.state.date || new Date().toISOString()
      }
      await this.articleRepository.postArticle(article);
      this.setState({ redirect: true });
    }

    if (this.state.button.value === "Post Article") {
      this.setState({ button: { value: "Posted", class: "btn-success disabled" } });
    }
  }

  render() {
    if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return <Redirect to="/login" push />
    }

    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }

    return (
      <div className="container mx-auto mt-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h4>Write Your Article</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form onSubmit={this.handleClick}>
                  <div className="form-group row">
                    <label htmlFor="Title" className="col-4 col-form-label">
                      Title
                    </label>
                    <div className="col-8">
                      <input
                        id="Title"
                        name="Title"
                        placeholder="Title"
                        className="form-control here"
                        required="required"
                        type="text"
                        value={this.state.title}
                        onChange={(e) =>
                          this.setState({
                            title: e.target.value
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="image" className="col-4 col-form-label">
                      Image URL
                    </label>
                    <div className="col-8">
                      <input
                        id="image"
                        name="image"
                        placeholder="Image link"
                        className="form-control here"
                        type="text"
                        value={this.state.image}
                        onChange={(e) =>
                          this.setState({
                            image: e.target.value
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="Content" className="col-4 col-form-label">
                      Content
                    </label>
                    <div className="col-8">
                      <textarea
                        name="Content"
                        id="Content"
                        cols="70"
                        rows="10"
                        className="form-control"
                        value={this.state.content}
                        onChange={(e) =>
                          this.setState({
                            content: e.target.value
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <p>Date Published: {new Date().toLocaleDateString()}</p>
                  <div className="form-group row">
                    <label htmlFor="category" className="col-4 col-form-label">
                      Category
                    </label>
                    <div className="col-8">
                      <select
                        id="category"
                        name="category"
                        className="custom-select"
                        value={ this.state.category }
                        onChange={(e) =>
                          this.setState({
                            category: e.target.value
                          })}
                      >
                        <option
                          value="All Categories"
                        >
                          All Categories
                        </option>
                        <option
                          name="health"
                          value="health"
                        >
                          Health
                        </option>
                        <option
                          id="tech"
                          value="tech"
                        >
                          Tech
                        </option>
                        <option
                          id="wealth"
                          value="wealth"
                        >
                          Wealth
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="offset-4 col-8">
                      <button
                        type="button"
                        className={ "btn " + this.state.button.class }
                        onClick={this.handleClick}
                      >
                        {this.state.button.value}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const articleId = +this.props.match.params.articleId;
    if (articleId) {
      this.setState({ edit: true });
      let article = await this.articleRepository.getArticle(articleId);
      if (!article) {
        alert('Not a valid article!');
        this.setState({ redirect: true });
        return;
      }
      if (article.authorId !== +sessionStorage.getItem("userId")) {
        debugger;
        alert('This is not your article!');
        this.setState({ redirect: true });
        return;
      }
      this.setState({
        title: article.title,
        image: article.image,
        content: article.content,
        date: article.datePosted,
        author: +sessionStorage.getItem("userId"),
        category: article.category,
      });
    }
  }
}
