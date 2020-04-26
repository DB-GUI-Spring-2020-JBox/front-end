import React from "react";
//import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Profile extends React.Component {
  state = {
    username: "",
    firstName: "",
    lastName: "",
    displayName: "",
    password: "",
    email: "",
    website: "",
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
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
                        <label for="username" className="col-4 col-form-label">
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
                        <label for="name" className="col-4 col-form-label">
                          First Name
                        </label>
                        <div className="col-8">
                          <input
                            id="name"
                            name="name"
                            placeholder="First Name"
                            className="form-control here"
                            type="text"
                            value={this.state.firstName}
                            onChange={(e) =>
                              this.setState({ firstName: e.target.value })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="lastname" className="col-4 col-form-label">
                          Last Name
                        </label>
                        <div className="col-8">
                          <input
                            id="lastname"
                            name="lastname"
                            placeholder="Last Name"
                            className="form-control here"
                            type="text"
                            value={this.state.lastName}
                            onChange={(e) =>
                              this.setState({ lastName: e.target.value })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="select" className="col-4 col-form-label">
                          Display Name public as
                        </label>
                        <div className="col-8">
                          <select
                            id="select"
                            name="select"
                            className="custom-select"
                          >
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="email" className="col-4 col-form-label">
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
                        <label for="website" className="col-4 col-form-label">
                          Website
                        </label>
                        <div className="col-8">
                          <input
                            id="website"
                            name="website"
                            placeholder="website"
                            className="form-control here"
                            type="text"
                            value={this.state.webiste}
                            onChange={(e) =>
                              this.setState({ website: e.target.value })
                            }
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          for="publicinfo"
                          className="col-4 col-form-label"
                        >
                          Public Info
                        </label>
                        <div className="col-8">
                          <textarea
                            id="publicinfo"
                            name="publicinfo"
                            cols="40"
                            rows="4"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label for="newpass" className="col-4 col-form-label">
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
                          <button
                            name="submit"
                            type="submit"
                            className="btn btn-primary"
                          >
                            Update My Profile
                          </button>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-4 col-8">
                          <Link to="/messenger/t/:recipient">
                            <button
                              name="submit"
                              type="submit"
                              className="btn btn-primary"
                            >
                              Messages
                            </button>
                          </Link>
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
