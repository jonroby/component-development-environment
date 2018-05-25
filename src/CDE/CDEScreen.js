// @flow

import React, { Component } from "react";

import * as components from "../components/index.js";
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
        componentProps[this.state.selectedComponent].props) ||
      {};

    return (
      <div className="cde-screen">
        <ComponentBar
          components={Object.keys(components)}
          selectedComponent={this.state.selectedComponent}
          onSelect={this.onSelect}
        />
        <CDE componentProps={cp} />
      </div>
    );
  }
}

export default CDEScreen;
