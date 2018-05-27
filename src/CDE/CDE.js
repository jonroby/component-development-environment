// @flow

import React, { Component } from "react";

import "./CDE.css";

import TypesTable from "./TypesTable";

class CDE extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "component"
    };
  }

  renderSelectedTab = element => {
    const types = (
      <TypesTable componentProps={this.props.componentProps.props} />
    );

    const component = (
      <div className="cde-component-container">
        <div className="cde-component-outer">
          <div className="cde-component">{element}</div>
        </div>
      </div>
    );

    const code = (
      <pre className="code">{this.props.componentProps.filecontents}</pre>
    );
    const opts = { types, component, code };
    return opts[this.state.selectedTab];
  };

  render() {
    const el = this.props.selectedComponent
      ? this.props.components[this.props.selectedComponent]
      : false;
    const element = el ? React.createElement(el, null, null) : null;

    return (
      <div className="cde">
        <div>
          <div className="cde-component-name">
            <div>{this.props.selectedComponent}</div>
          </div>

          <div className="cde-tab-bar">
            <div
              className={
                this.state.selectedTab === "component"
                  ? "cde-selected-tab"
                  : "cde-tab"
              }
              onClick={e => this.setState({ selectedTab: "component" })}
            >
              Component
            </div>
            <div
              className={
                this.state.selectedTab === "types"
                  ? "cde-selected-tab"
                  : "cde-tab"
              }
              onClick={e => this.setState({ selectedTab: "types" })}
            >
              Types
            </div>
            <div
              className={
                this.state.selectedTab === "code"
                  ? "cde-selected-tab"
                  : "cde-tab"
              }
              onClick={e => this.setState({ selectedTab: "code" })}
            >
              Code
            </div>
          </div>

          {this.renderSelectedTab(element)}
        </div>
      </div>
    );
  }
}

export default CDE;
