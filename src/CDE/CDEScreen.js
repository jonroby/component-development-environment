// @flow

import React, { Component } from "react";

import CDE from "./CDE";
import ComponentBar from "./ComponentBar";

import "./CDEScreen.css";

class CDEScreen extends Component {
  render() {
    return (
      <div className="cde-screen">
        <div className="cde-screen-padding-left" />
        <ComponentBar />
      </div>
    );
  }
}

//   <CDE
// components={components}
// selectedComponent={this.state.selectedComponent}
//   />

export default CDEScreen;
