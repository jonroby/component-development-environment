// @flow

import React, { Component } from "react";

import "./Post.css";

type Props = {
  // firstName: ?string,
  // lastName: string,
  // testArr: ?Array<number>,
  // testArr2: Array<string>,
  // testArrOfArrs: Array<Array<number>>,
  testObj: {
    objNum: number,
    objStr: string,
    nestedObj: {
      nestedNum: number,
      nestedStr: string
    }
  },
  // firstName: string
  // uni: (number | string | boolean),
  test: Array<boolean | string | number>,


};

class Post extends Component<Props> {
  render() {
    return (
      <div className="Post">
      </div>
    );
  }
}

export default Post;
