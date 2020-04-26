import React, { Component } from "react";
import { Link } from "react-router-dom";
import AccountRepository from "../Api/accountRepository";
export class UpdateProfile extends React.Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    other: ""
  };

  accountRepository = new AccountRepository();

  render() {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <h4>Your Profile</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form>
                  <div className="form-group row">
                    <label htmlFor="username" className="col-4 col-form-label">
                      User Name*
                    </label>
                    <div className="col-8">
                      <input
                        id="username"
                        name="username"
                        placeholder="Username"
                        className="form-control here"
                        required="required"
                        type="text"
                        value={this.state.username}
                        onChange={(e) =>
                          this.setState({ username: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="name" className="col-4 col-form-label">
                      Name
                    </label>
                    <div className="col-8">
                      <input
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="form-control here"
                        type="text"
                        value={this.state.name}
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-4 col-form-label">
                      Email*
                    </label>
                    <div className="col-8">
                      <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="form-control here"
                        required="required"
                        type="text"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="facebook" className="col-4 col-form-label">
                      Facebook Link
                    </label>
                    <div className="col-8">
                      <input
                        id="facebook"
                        name="facebook"
                        placeholder="facebook.com"
                        className="form-control here"
                        type="text"
                        value={this.state.facebook}
                        onChange={(e) =>
                          this.setState({ facebook: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="instagram" className="col-4 col-form-label">
                      Instagram Link
                    </label>
                    <div className="col-8">
                      <input
                        id="instagram"
                        name="instagram"
                        placeholder="instagram.com"
                        className="form-control here"
                        type="text"
                        value={this.state.instagram}
                        onChange={(e) =>
                          this.setState({ instagram: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="linkedin" className="col-4 col-form-label">
                      LinkedIn Link
                    </label>
                    <div className="col-8">
                      <input
                        id="linkedin"
                        name="linkedin"
                        placeholder="linkedin.com"
                        className="form-control here"
                        type="text"
                        value={this.state.linkedin}
                        onChange={(e) =>
                          this.setState({ linkedin: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="other" className="col-4 col-form-label">
                      Other Link
                    </label>
                    <div className="col-8">
                      <input
                        id="other"
                        name="other"
                        placeholder="youtube.com"
                        className="form-control here"
                        type="text"
                        value={this.state.other}
                        onChange={(e) =>
                          this.setState({ other: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="newpass" className="col-4 col-form-label">
                      New Password
                    </label>
                    <div className="col-8">
                      <input
                        id="newpass"
                        name="newpass"
                        placeholder="New Password"
                        className="form-control here"
                        type="text"
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="offset-4 col-8">
                      <div>
                        <button
                          name="submit"
                          type="submit"
                          className="btn btn-primary"
                        >
                          Submit Changes
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      className="btn btn-secondary"
                      to="/profile"
                    >
                      Back to Profile
                    </Link>
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
    let profile = await this.accountRepository.getProfile(+sessionStorage.getItem("userId"));

    this.setState({
      username: profile.userName,
      name: profile.name || "",
      email: profile.email || "",
      password: "",
      facebook: profile.linkToFacebook || "",
      instagram: profile.linkToInstagram || "",
      linkedin: profile.linkToLinkedIn || "",
      other: profile.otherLink || ""
    })

  }
}
