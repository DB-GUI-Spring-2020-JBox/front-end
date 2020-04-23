import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Time from "react-time";
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
      <div>
        <div>
          <label for="Title">Title:</label>
          <input
            id="Title"
            name="Title"
            placeholder="Title"
            className="form-control here"
            required="required"
            type="text"
            value={this.state.article.title}
            onChange={(e) =>
              this.setState({ article: { title: e.target.value } })
            }
          ></input>
        </div>
        <div>
          <label for="Content">Content:</label>
          <textarea
            name="Content"
            cols="70"
            rows="10"
            value={this.state.article.content}
            onChange={(e) =>
              this.setState({ article: { content: e.target.value } })
            }
          ></textarea>
        </div>
        <div>
          <label for="Author">Author:</label>
          <input
            name="Author"
            id="Author"
            placeholder="Author"
            className="form-control here"
            required="required"
            type="text"
            value={this.state.article.author}
            onChange={(e) =>
              this.setState({ article: { author: e.target.value } })
            }
          />
        </div>
        <div>
          <button
            onClick={this.handleClick}
            style={{ backgroundColor: this.state.button.color }}
          >
            {this.state.button.value}
          </button>
        </div>
      </div>
    );
  }
}
