// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import "./CDE.css";

import TypesTable from "./TypesTable";
import SelectFakeProps from "./SelectFakeProps.js";

class CDE extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "component",
      fakeProps: {},
      snapshots: ["default"],
      selectedSnapshot: "default"
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/fake_props/${this.props.selectedComponent}`)
      .then(response => {
        console.log("response ", response);
        return response.json();
      })
      .then(fakeProps => {
        if (!fakeProps) return;
        this.setState({ fakeProps });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedComponent === this.props.selectedComponent) return;

    fetch(`http://localhost:3000/fake_props/${this.props.selectedComponent}`)
      .then(response => {
        return response.json();
      })
      .then(fakeProps => {
        if (!fakeProps) return;
        this.setState({ fakeProps });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderSelectedTab = element => {
    const types = (
      <TypesTable selectedComponent={this.props.selectedComponent} />
    );

    const component = (
      <div className="cde-component-container">
        <div className="cde-component-outer">
          <div className="cde-component">{element}</div>
        </div>
      </div>
    );

    const custom = (
      <SelectFakeProps
        selectedComponent={this.props.selectedComponent}
        updateSnapshots={this.updateSnapshots}
        selectedSnapshot={this.selectedSnapshot}
      />
    );

    // const code = (
    //   <pre className="code">{this.props.componentProps.filecontents}</pre>
    // );

    const code = null;

    const opts = { types, component, code, custom };
    return opts[this.state.selectedTab];
  };

  updateSnapshots = snapshots => {
    this.setState({ snapshots });
  };

  render() {
    const el = this.props.selectedComponent
      ? this.props.components[this.props.selectedComponent]
      : false;

    // console.log('this.props.componentProps ', this.props.componentProps)
    // const selectedComponentProps = this.props.componentProps
    console.log("this.state.fakeProps ", this.state.fakeProps);

    const element = el
      ? React.createElement(el, this.state.fakeProps, null)
      : null;

    return (
      <div className="cde">
        <div>
          <div className="cde-component-name">
            <div>{this.props.selectedComponent}</div>
            <div>{this.state.snapshots.map(i => <div>{i}</div>)}</div>
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
                this.state.selectedTab === "custom"
                  ? "cde-selected-tab"
                  : "cde-tab"
              }
              onClick={e => this.setState({ selectedTab: "custom" })}
            >
              Custom
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

const mapStateToProps = state => ({
  components: state.cde.components,
  selectedComponent: state.cde.selectedComponent
});

export default connect(mapStateToProps)(CDE);
