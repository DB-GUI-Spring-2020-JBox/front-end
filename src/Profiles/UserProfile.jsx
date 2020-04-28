import React from "react";
import ArticleRepository from "../Api/articleRepository";
import { users } from "../SampleData/users";
import { Link, Redirect } from "react-router-dom";
import AccountRepository from "../Api/accountRepository";
import ReviewsRepository from "../Api/reviewsRepository";

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
        bio: "",
      },
      userId: undefined,
      followButton: {
        value: "Follow",
        class: "btn-success",
      },
      articles: [],
      reviews: [],
      ratingStars: [
        {
          id: 1,
          val: 1,
        },
        {
          id: 2,
          val: 2,
        },
        {
          id: 3,
          val: 3,
        },
        {
          id: 4,
          val: 4,
        },
        {
          id: 5,
          val: 5,
        },
      ],
      edit: "false",
      reviewId: "",
      averageRating: "",
      comment: "",
      rating: 1,
      articleId: "",
      reviewButton: {
        value: "Submit",
        class: "btn-primary",
      },
      blockButton: {
        value: "Block",
        class: "btn-danger",
      },
      articles: [],
    };
    this.handleClick = this.onFollow.bind(this);
    this.handleClick = this.onReview.bind(this);
    this.handleClick = this.onEditReview(this);
  }

  articleRepository = new ArticleRepository();
  accountRepository = new AccountRepository();
  reviewsRepository = new ReviewsRepository();

  async onDeleteArticle(articleId) {
    if (window.confirm("Are you sure you want to delete this article?")) {
      let res = await this.articleRepository.deleteArticle(articleId);
    }
  }

  async onDeleteReview(reviewID) {
    debugger;
    if (window.confirm("Are you sure you want to delete this review?")) {
      let res = await this.reviewsRepository.deleteReview(reviewID);
    }
    this.updateReviews();
  }

  async onEditReview(reviewID) {
    this.setState({
      reviewId: reviewID,
      rating: await this.reviewsRepository.returnReviewByID(reviewID).ranking,
      comment: await this.reviewsRepository.returnReviewByID(reviewID).content,
      articleId: await this.reviewsRepository.returnReviewByID(reviewID)
        .article,
      edit: "true",
    });
    this.forceUpdate();
    console.log(this.reviewsRepository.getReviewsByUser(4));
  }

  componentWillMount() {
    let userId = +this.props.match.params.userId;
    if (!userId) {
      userId = +sessionStorage.getItem("userId");
    }

    this.setState({ userId });
  }

  onFollow() {
    if (this.state.followButton.value === "Follow") {
      this.setState({
        followButton: { value: "Unfollow", class: "btn-outline-success" },
      });
      this.accountRepository.follow(
        +sessionStorage.getItem("userId"),
        this.state.userId
      );
    } else {
      this.setState({
        followButton: { value: "Follow", class: "btn-success" },
      });
      this.accountRepository.unFollow(
        +sessionStorage.getItem("userId"),
        this.state.userId
      );
    }
  }

  onBlock() {
    if (this.state.blockButton.value === "Block") {
      this.setState({
        blockButton: { value: "Unblock", class: "btn-outline-danger" },
      });
      this.accountRepository.block(
        +sessionStorage.getItem("userId"),
        this.state.userId
      );
    } else {
      this.setState({ blockButton: { value: "Block", class: "btn-danger" } });
      this.accountRepository.unBlock(
        +sessionStorage.getItem("userId"),
        this.state.userId
      );
    }
  }

  async updateReviews() {
    let reviews = await this.reviewsRepository.getReviewsByUser(
      this.state.userId
    );

    reviews.sort(
      (a, b) =>
        new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
    );

    this.setState({ reviews });

    let averageRating = 0;
    var i;
    for (i = 0; i < reviews.length; i++) {
      averageRating = averageRating + reviews[i].ranking;
    }
    averageRating = averageRating / reviews.length;
    if (averageRating) {
      averageRating = averageRating.toFixed(1);
    }
    this.setState({ averageRating: averageRating || "N/A" });
  }

  async onReview() {
    debugger;
    /*if (this.state.edit === "true") {
      await this.reviewsRepository.editReview(
        this.state.reviewId,
        this.state.comment,
        this.state.rating,
        this.state.articleId
      );
      this.setState({ edit: "false" });
    } */
    await this.reviewsRepository.review(
      +sessionStorage.getItem("userId"),
      this.state.comment,
      this.state.rating,
      this.state.articleId
    );

    this.setState({ comment: "", rating: 1 });
    this.updateReviews();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    const dateOptionsWithTime = {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    };
    const dateOptions = {
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    return (
      <div className="container bg-white p-5 mt-4 border-dark">
        <section>
          <div className="d-flex">
            <h1>{this.state.profile.name}</h1>
            {this.state.userId !== +sessionStorage.getItem("userId") && (
              <>
                <button
                  onClick={() => this.onFollow()}
                  type="button"
                  className={
                    "btn my-auto ml-4 " + this.state.followButton.class
                  }
                >
                  {this.state.followButton.value}
                </button>
                <Link
                  to={"/messenger/t/" + this.state.userId}
                  className="btn btn-warning my-auto ml-4"
                >
                  Message
                </Link>
                <button
                  onClick={() => this.onBlock()}
                  type="button"
                  className={"btn my-auto ml-4 " + this.state.blockButton.class}
                >
                  {this.state.blockButton.value}
                </button>
              </>
            )}
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
                  <a
                    className="dropdown-item"
                    href={this.state.profile.linkToInstagram}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href={this.state.profile.linkToLinkedIn}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href={this.state.profile.linkToFacebook}
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href={this.state.profile.otherLink}
                  >
                    Website
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <h5>
            <i className="glyphicon glyphicon-envelope"></i>
            Contact email:{" "}
            <a href={"mailto:" + this.state.profile.email}>
              {this.state.profile.email}
            </a>
            <br />
            <i className="glyphicon glyphicon-globe"></i>
            <br />
            <i className="glyphicon glyphicon-gift"></i>
            Joined:{" "}
            {new Date(this.state.profile.joinDate).toLocaleString(
              "default",
              dateOptions
            )}
          </h5>
          <div>
            <h3 className="mt-3">About Me</h3>
            <p>{this.state.profile.bio}</p>
          </div>
          {this.state.userId === +sessionStorage.getItem("userId") && (
            <Link className="btn btn-outline-primary mt-1" to="/profile/update">
              Update Profile
            </Link>
          )}
        </section>
        <hr />
        <section>
          <h3>Articles</h3>
          {this.state.articles.map((article) => (
            <div className="card my-3 p-3 shadow-sm">
              <h5 className="card-title">
                <Link to={"/articles/" + article.ID}>{article.title}</Link>
              </h5>
              <div className="d-flex">
                <div>
                  <h6 className="card-subtitle text-muted">
                    {new Date(article.datePosted).toLocaleString(
                      "default",
                      dateOptionsWithTime
                    )}
                  </h6>
                </div>
                {this.state.userId === +sessionStorage.getItem("userId") && (
                  <>
                    <Link
                      to={`/articles/${article.ID}/edit`}
                      className="btn btn-link py-0"
                      style={{ marginTop: "-0.6em" }}
                    >
                      Edit
                    </Link>
                    <div
                      className="btn btn-link text-danger py-0"
                      style={{ marginTop: "-0.6em" }}
                      onClick={() => this.onDeleteArticle(article.ID)}
                    >
                      Delete
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </section>
        <hr />
        <section>
          {this.state.userId !== +sessionStorage.getItem("userId") && (
            <>
              <h3>Reviews: </h3>
              <h4>Average Rating: {this.state.averageRating}</h4>
              {this.state.reviews.map((review) => (
                <div className="card my-3 p-3 shadow-sm">
                  <h5 className="card-title">
                    <Link to={"/articles/" + review.article}>
                      Review for: {review.title}
                    </Link>
                  </h5>
                  <h5 classname="card-title">"{review.content}"</h5>
                  <h6 className="card-title">
                    <Link to={"/userprofile/" + review.author}>
                      By {review.name}
                    </Link>
                  </h6>
                  <div className="d-flex">
                    <div>
                      <h6 className="card-subtitle text-muted">
                        {new Date(review.datePosted).toLocaleString(
                          "default",
                          dateOptionsWithTime
                        )}
                      </h6>
                    </div>
                    {this.state.userId !== +sessionStorage.getItem("userId") &&
                      review.author === +sessionStorage.getItem("userId") && (
                        <>
                          <div
                            className="btn btn-link text-danger py-0"
                            style={{ marginTop: "-0.6em" }}
                            onClick={() => this.onDeleteReview(review.ID)}
                          >
                            Delete
                          </div>
                        </>
                      )}
                  </div>
                </div>
              ))}
              <hr />
              <h3>Post Your Review:</h3>
              <div>
                <label htmlFor="Title" className="col-4 col-form-label">
                  Title
                </label>
                <div className="col-8">
                  <select
                    className="form-control"
                    value={this.state.articleId}
                    onChange={(e) =>
                      this.setState({
                        articleId: e.target.value,
                      })
                    }
                  >
                    {this.state.articles.map((article) => (
                      <option key={article.ID} value={article.ID}>
                        {article.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div>
                <label htmlFor="Comment" className="col-4 col-form-label">
                  Comment
                </label>
                <div className="col-8">
                  <textarea
                    name="Comment"
                    id="Comment"
                    cols="20"
                    rows="5"
                    className="form-control"
                    value={this.state.comment}
                    onChange={(e) =>
                      this.setState({
                        comment: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <br />
              <div>
                <label htmlFor="Rating" className="col-4 col-form-label">
                  Rating
                </label>
                <div className="col-8">
                  <select
                    className="form-control col-1"
                    value={this.state.rating}
                    onChange={(e) =>
                      this.setState({
                        rating: e.target.value,
                      })
                    }
                  >
                    {this.state.ratingStars.map((star) => (
                      <option key={star.id} value={star.val}>
                        {star.val}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <br />
              <div>
                <button
                  onClick={() => this.onReview()}
                  type="button"
                  className={
                    "btn my-auto ml-3 " + this.state.reviewButton.class
                  }
                >
                  {this.state.reviewButton.value}
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    );
  }

  async componentDidMount() {
    let profile = await this.accountRepository.getProfile(this.state.userId);
    if (!profile) {
      alert("Not a valid user profile!");
      this.setState({ redirect: true });
      return;
    }
    this.setState({ profile });

    let doesFollow = await this.accountRepository.doesFollow(
      +sessionStorage.getItem("userId"),
      this.state.userId
    );
    if (doesFollow) {
      this.setState({
        followButton: { value: "Unfollow", class: "btn-outline-success" },
      });
    }

    let doesBlock = await this.accountRepository.isBlocked(
      +sessionStorage.getItem("userId"),
      this.state.userId
    );
    if (doesBlock) {
      this.setState({
        blockButton: { value: "Unblock", class: "btn-outline-danger" },
      });
    }

    let articles = await this.articleRepository.getArticlesByUser(
      this.state.userId
    );

    articles.sort(
      (a, b) =>
        new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
    );

    this.setState({ articles });

    this.setState({ articleId: articles[0].ID });
    debugger;

    this.updateReviews();
  }
}
