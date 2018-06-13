// @flow

import React, { Component } from "react";

import "./Post.css";

type Props = {
  postTitle: number,
  postId: number,
  testString: string,
  testArrStr: Array<string>,
  testArrNum: Array<number>,
  testArrOfArrs: Array<Array<number>>,
  testObj: {
    objNum: number,
    objStr: string,
    nestedObj: {
      nestedNum: number,
      nestedStr: string,
    }
  }
};

class Post extends Component<Props> {
  render() {
    return (
        <div className="Post">
        <div>Post</div>
        <div>post title: {this.props.postTitle}</div>
        <div>post id: {this.props.postId}</div>
        </div>
    );
  }
}

export default Post;
