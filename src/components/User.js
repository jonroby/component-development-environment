// @flow

import React, { Component } from 'react';

import './User.css';

// type test = {
//   isSubscriber: boolean,
// }

type Props = {
  userTitle: string,
  userId: number,
  userFavoriteNumbers: Array<number>
};

class User extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const userFavoriteNumbers = this.props.userFavoriteNumbers ? this.props.userFavoriteNumbers : [];
    return (
        <div className="User">
        <div>User</div>
        <div>user name: {this.props.userName}</div>
        <div>user id: {this.props.userId}</div>
        <div>user favorite numbers: {userFavoriteNumbers.map(i => <div>{i}</div>)}</div>
        </div>
    );
  }
}

export default User;
