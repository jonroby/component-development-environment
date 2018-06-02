// @flow

import React, { Component } from "react";

import "./User.css";

type Props = {
  username: string,
  firstname: string,
  lastname: string,
  // isSubscriber: boolean,
  userId: number,


  favoriteWebsites: Array<string>,
  // favoriteNumbers: Array<number>,
  arrOfArrs: Array<Array<string>>,

  // favoriteThings: Array<string | number>,
  // userType: Array<string> | "intermediate" | "expert",
  // litNum: 2,
  // litBool: true,
  userData: {
    thing1: string,
    thing2: number,
    thingArr: Array<Array<number>>,
    thing3: {
      nestedStr: string,
      nestedNum: number,
      nestedArr: Array<string>
    }
  },
  // getSomething: (name: string, isSubscriber: boolean) => number
};

class Movie extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const userFavoriteNumbers = this.props.favoriteNumbers
      ? this.props.favoriteNumbers
      : [];

    return (
      <div className="User">
        <div>User</div>
        <div>user name: {this.props.username}</div>
        <div>user id: {this.props.userId}</div>
        <div>first name: {this.props.firstname}</div>
        <div>last name: {this.props.lastname}</div>
        <div>isSubscriber: {String(this.props.isSubscriber)}</div>

        <div>
          user favorite numbers: {userFavoriteNumbers.map(i => <div>{i}</div>)}
        </div>
      </div>
    );
  }
}

export default Movie;
