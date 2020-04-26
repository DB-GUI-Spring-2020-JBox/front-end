import React from "react";
import { Link, Redirect } from "react-router-dom";
//import "./postarticle.css";
//import Time from "react-time";

export class PostArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      article: {
        title: "",
        content: "",
        //date: new Date(),
        author: +sessionStorage.getItem("userId"),
        category: "",
      },
      button: {
        value: "Post Article",
        class: "btn-primary",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

    if (this.state.button.value === "Post Article") {
      this.setState({ button: { value: "Posted", class: "btn-success disabled" } });
    }
  }

  render() {
    if (sessionStorage.getItem("isAuthenticated") !== "true") {
			return <Redirect to="/login" push />
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
                <form>
                  <div className="form-group row">
                    <label for="username" className="col-4 col-form-label">
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
                        value={this.state.article.title}
                        onChange={(e) =>
                          this.setState({
                            article: { title: e.target.value },
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="name" className="col-4 col-form-label">
                      Content
                    </label>
                    <div className="col-8">
                      <textarea
                        name="Content"
                        cols="70"
                        rows="10"
                        className="form-control"
                        value={this.state.article.content}
                        onChange={(e) =>
                          this.setState({
                            article: { content: e.target.value },
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <p>Date Published: {new Date().toLocaleDateString()}</p>
                  <div className="form-group row">
                    <label for="select" className="col-4 col-form-label">
                      Category
                    </label>
                    <div className="col-8">
                      <select
                        id="category"
                        name="category"
                        className="custom-select"
                      >
                        <option
                          value="All Categories"
                          onChange={(e) =>
                            this.setState({
                              article: { category: e.target.value },
                            })
                          }
                        >
                          All Categories
                        </option>
                        <option
                          value="Health"
                          onChange={(e) =>
                            this.setState({
                              article: { category: e.target.value },
                            })
                          }
                        >
                          Health
                        </option>
                        <option
                          value="Tech"
                          onChange={(e) =>
                            this.setState({
                              article: { category: e.target.value },
                            })
                          }
                        >
                          Tech
                        </option>
                        <option
                          value="Wealth"
                          onChange={(e) =>
                            this.setState({
                              article: { category: e.target.value },
                            })
                          }
                        >
                          Wealth
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="offset-4 col-8">
                      <button
                        name="submit"
                        type="submit"
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
}
