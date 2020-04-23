import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./postarticle.css";
//import Time from "react-time";

const categories = ["All Categories", "Health", "Tech", "Wealth"];

export class PostArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      article: {
        title: "",
        content: "",
        //date: new Date(),
        author: "",
        category: "",
      },
      button: {
        value: "Post Article",
        color: "aqua",
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.state.button.value === "Post Article") {
      this.setState({ button: { value: "Posted", color: "palegreen" } });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
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
                            value={this.state.article.content}
                            onChange={(e) =>
                              this.setState({
                                article: { content: e.target.value },
                              })
                            }
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="lastname" className="col-4 col-form-label">
                          Author
                        </label>
                        <div className="col-8">
                          <input
                            name="Author"
                            id="Author"
                            placeholder="Author"
                            className="form-control here"
                            required="required"
                            type="text"
                            value={this.state.article.author}
                            onChange={(e) =>
                              this.setState({
                                article: { author: e.target.value },
                              })
                            }
                          ></input>
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
                            className="btn btn-primary"
                            onClick={this.handleClick}
                            style={{ backgroundColor: this.state.button.color }}
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
        </div>
      </div>
    );
  }
}
