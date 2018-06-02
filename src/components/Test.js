// @flow

import React, { Component } from "react";

type Props = {
  id: string,
  title: string,
  director: string,
  year: number
};

class Movie extends Component<Props> {
  render() {
    return (
      <div className="Movie">
        <div>Movie</div>
        <div>Movie ID: {this.props.id}</div>
        <div>Movie Title: {this.props.title}</div>
        <div>Movie Director: {this.props.director}</div>
        <div>Movie Year: {this.props.year}</div>
      </div>
    );
  }
}

export default Movie;
