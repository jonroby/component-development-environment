// @flow

import React, { Component } from "react";

import "./CDE.css";

// import TypesDisplay from "./TypesDisplay";

class CDE extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("this.props.componentProps ", this.props.componentProps);
    let displayName = this.props.componentProps.displayName || "";

    // const el = this.props.selected ? components[this.props.selected] : false;
    // const element = el ? React.createElement(el, fakeProps, null) : null;

    return (
      <div className="cde">
        <div>
          <div className="cde-component-name">
            <div>{displayName}</div>
          </div>
        </div>
      </div>
    );
  }
}

// <TypesDisplay />
//  <div className="cde-component">{element}</div>

export default CDE;
