import React, { Component } from "react";
import { Link } from "react-router-dom";
export class PostArticle extends React.Component {
  state = {
    article: {
      title: "",
      content: "",
      date: "",
      author: {
        id: "",
        name: "",
      },
      category: "",
    },
  };
  render() {
    return (
      <div>
        <div>
          <label for="email">Email:</label>
          <input type="text" name="email" />
          <span class="form_hint">Proper format "name@something.com"</span>
        </div>
        <div>
          <label for="website">Website:</label>
          <input type="text" name="website" />
          <span class="form_hint">Proper format "http://someaddress.com"</span>
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea name="message" cols="40" rows="6"></textarea>
        </div>
        <div>
          <button class="submit" type="submit">
            Submit Form
          </button>
        </div>
      </div>
    );
  }
}
