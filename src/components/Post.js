// @flow

import React, { Component } from "react";

import "./Post.css";

type Props = {
  postTitle: string,
  postId: number,
  testString: string,
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
