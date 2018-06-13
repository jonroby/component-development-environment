// @flow

import React, { Component } from "react";

type Props = {
  // id: string,
  // title: string,
  // director: string,
  // year: number,
  // literalNum: 1,
  // arrayNum: Array<number>,
  // arrArrNum: Array<Array<number>>,
  // unionTest: Array<number | string | Array<number>>,
  // union: number | string,
  // unionArr: Array<number | Array<number>>,
  // optionalVal: ?string,
  // optionalKey?: string,
  // optionalBoth?: ?string,
  // obj: {
  //   objOptionalVal: ?string,
  //   objOptionalKey?: string,
  // }
  test: boolean
  // uniArray: Array<number | string>
};

class Test extends Component<Props> {
  render() {
    return (
        <div className="Test">
        <div>Test</div>
        <div>Test ID: {this.props.id}</div>
        <div>Test Title: {this.props.title}</div>
        <div>Test Director: {this.props.director}</div>
        <div>Test Year: {this.props.year}</div>
        </div>
    );
  }
}

export default Test;
