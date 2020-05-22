import React, { Component } from "react";
import { withAuth } from './../lib/Auth';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        {
          this.props.isLoggedIn
            ? <h3>Username: {this.props.user.username}</h3>
            : null
        }

      </div>
    );
  }
}

export default withAuth(Profile);
