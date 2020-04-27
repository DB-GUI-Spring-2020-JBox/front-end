import React from "react";
import ArticleRepository from '../Api/articleRepository';
import { users } from "../SampleData/users";
import { Link } from "react-router-dom";
import AccountRepository from "../Api/accountRepository";

export class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: {
        name: "",
        email: "",
        linkToFacebook: "",
        linkToInstagram: "",
        linkToLinkedIn: "",
        otherLink: "",
        joinDate: "",
      },
      userId: undefined,
      button: {
        value: "Follow",
        class: "btn-success"
      },
      articles: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  articleRepository = new ArticleRepository();
  accountRepository = new AccountRepository();

  async onDeleteArticle(articleId) {
    if (window.confirm('Are you sure you want to delete this article?')) {
      let res = this.articleRepository.deleteArticle(articleId);
    }
  }

  componentWillMount() {
    let userId = +this.props.match.params.userId;
    if (!userId) {
      userId = +sessionStorage.getItem("userId");
    }
    
    this.setState({ userId });
  }

  handleClick() {
    if (this.state.button.value === "Follow") {
      this.setState({ button: { value: "Unfollow", class: "btn-secondary" } });
    } else {
      this.setState({ button: { value: "Follow", class: "btn-success" } });
    }
  }

  render() {
    const dateOptionsWithTime = { 
      month: 'long', 
      day: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      hour12: true, 
      minute: '2-digit' 
    }
    const dateOptions = { 
      month: 'long', 
      day: '2-digit', 
      year: 'numeric'
    }
    return (
      <div className="container bg-white p-5 mt-4 border-dark">
        <section>
          <div className="d-flex">
            <h1>{this.state.profile.name}</h1>

            <button
              onClick={this.handleClick}
              type="button"
              className={ "btn my-auto ml-4 " + this.state.button.class }>
              {this.state.button.value}
            </button>
          </div>
          <div className="row">
            <div className="btn-group col-1 mb-3">
              <button type="button" className="btn btn-primary">
                Social
              </button>
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
              >
                <span className="caret"></span>
                <span className="sr-only">Social</span>
              </button>
              <ul className="dropdown-menu" role="menu">
                <li>
                  <a className="dropdown-item" href={this.state.profile.linkToInstagram}>Instagram</a>
                </li>
                <li>
                  <a className="dropdown-item" href={this.state.profile.linkToLinkedIn}>LinkedIn</a>
                </li>
                <li>
                  <a className="dropdown-item" href={this.state.profile.linkToFacebook}>Facebook</a>
                </li>
              </ul>
            </div>
          </div>

          <h5>
            <i className="glyphicon glyphicon-envelope"></i>
            Contact email: <a href={"mailto:" + this.state.profile.email}>{this.state.profile.email}</a>
            <br />
            <i className="glyphicon glyphicon-globe"></i>
            <br />
            <i className="glyphicon glyphicon-gift"></i>
            Joined: {new Date(this.state.profile.joinDate).toLocaleString('default', dateOptions)}
          </h5>
          { this.state.userId === +sessionStorage.getItem("userId") &&
          <>
            <Link 
              className="btn btn-outline-primary mt-1"
              to="/profile/update">
              Update Profile
            </Link>
          </> }
        </section>
        <hr />
        <section>
          <h3>Articles</h3>
          {
            this.state.articles.map(article => 
              <div className="card my-3 border-0">
                <h5 className="card-title">
                  <Link to={ "/articles/" + article.ID }>
                    { article.title }
                  </Link>
                </h5>
                <div className="d-flex">
                  <div>
                    <h6 className="card-subtitle text-muted">
                      { new Date(article.datePosted).toLocaleString('default', dateOptionsWithTime) } 
                    </h6>
                  </div>
                  <div 
                    className="btn btn-link edit-link text-danger py-0" 
                    style={{ marginTop: "-0.6em" }}
                    onClick={ () => this.onDeleteArticle(article.ID) }>
                      Delete
                  </div>
                </div>
              </div>)
          }
        </section>
      </div>
    );
  }

  async componentDidMount() {

    let profile = await this.accountRepository.getProfile(this.state.userId);
    this.setState({ profile });

    let articles = await this.articleRepository.getArticlesByUser(this.state.userId);
    articles.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());

    this.setState({ articles });
  }

}
