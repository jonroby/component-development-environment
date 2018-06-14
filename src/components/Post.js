// @flow

import React, { Component } from "react";

import "./Post.css";

type Props = {
  title: string

};

class Post extends Component<Props> {
  render() {
    return (
      <div className="Post">
        Post
      </div>
    );
  }
}

export default Post;
