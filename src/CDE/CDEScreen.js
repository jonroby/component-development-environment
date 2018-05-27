// @flow

import React, { Component } from "react";

import * as components from "../components/index";
import componentProps from "../components/component-props/component-props";

import CDE from "./CDE";

import ComponentBar from "./ComponentBar";

import "./CDEScreen.css";

class CDEScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
      selectedComponent: ""
    };
  }

  componentDidMount() {
    this.setState({
      components: Object.keys(components),
      selectedComponent: Object.keys(components)[0]
    });
  }

  onSelect = (e, comp) => {
    this.setState({ selectedComponent: comp });
  };

  render() {
    let cp =
      (componentProps[this.state.selectedComponent] &&
        componentProps[this.state.selectedComponent]) ||
      {};

    console.log("cp ", componentProps);

    // if (cp) {
    //   const filecontents = componentProps[this.state.selectedComponent].props;
    //   cp = { cp, ...filecontents };
    // }

    return (
      <div className="cde-screen">
        <div className="cde-screen-padding-left" />
        <ComponentBar
          components={Object.keys(components)}
          selectedComponent={this.state.selectedComponent}
          onSelect={this.onSelect}
        />
        <CDE
          components={components}
          componentProps={cp}
          selectedComponent={this.state.selectedComponent}
        />
        <div className="cde-screen-padding-bottom" />
      </div>
    );
  }
}

export default CDEScreen;
