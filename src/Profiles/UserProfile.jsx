import React, { Component } from "react";
import { users } from "../SampleData/users";
export class UserProfile extends React.Component {
  state = {
    user: {
      name: "",
      email: "",
      linkToFacebook: "",
      linkToInstagram: "",
      linkToLinkedIn: "",
      otherLink: "",
      joinDate: "",
    },
  };

  componentWillMount() {
    let userId = +this.props.match.params.userId;
    if (userId) {
      this.setState({ user: users[0] });
    }
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="well well-sm">
              <div class="row">
                <div class="col-sm-6 col-md-4">
                  <img
                    src="http://placehold.it/380x500"
                    alt=""
                    class="img-rounded img-responsive"
                  />
                </div>
                <div class="col-sm-6 col-md-8">
                  <h4>{this.state.user.name}</h4>
                  <p>
                    <i class="glyphicon glyphicon-envelope"></i>
                    {this.state.user.email}
                    <br />
                    <i class="glyphicon glyphicon-globe"></i>
                    <a href="http://www.jquery2dotnet.com">
                      www.jquery2dotnet.com
                    </a>
                    <br />
                    <i class="glyphicon glyphicon-gift"></i>
                    {this.state.user.joinDate}
                  </p>
                  <div class="btn-group">
                    <button type="button" class="btn btn-primary">
                      Social
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      <span class="caret"></span>
                      <span class="sr-only">Social</span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                      <li>
                        <a href={this.state.user.linkToInstagram}>Instagram</a>
                      </li>
                      <li>
                        <a href={this.state.user.linkToLinkedIn}>LinkedIm</a>
                      </li>
                      <li>
                        <a href={this.state.user.linkToFacebook}>Facebook</a>
                      </li>
                    </ul>
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
