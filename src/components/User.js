// @flow

import React, { Component } from "react";

// import "./Movie.css";

type Props = {
  id: string,
  firstName: string,
  lastName: string,
  zipCode: number
};

class User extends Component<Props> {
  render() {
    return (
      <div className="Movie">
        <div>User</div>
        <div>ID: {this.props.id}</div>
        <div>First Name: {this.props.firstName}</div>
        <div>Last Name: {this.props.lastName}</div>
        <div>Zipcode: {this.props.zipCode}</div>
      </div>
    );
  }
}

export default User;
