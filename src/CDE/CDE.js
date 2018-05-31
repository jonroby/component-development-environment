// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "./Tabs";
import ComponentView from "./ComponentView";
import TypesTable from "./TypesTable";
import SelectFakeProps from "./SelectFakeProps.js";
import { fetchFakeProps } from "../redux/actions/cde";
import "./CDE.css";

class CDE extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchFakeProps(this.props.selectedComponent);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedComponent === this.props.selectedComponent) return;
    this.props.fetchFakeProps(this.props.selectedComponent);
  }

  renderSelectedTab = () => {
    const Component = (
      <ComponentView
        selectedComponent={this.props.selectedComponent}
        fakeProps={this.props.fakeProps}
      />
    );

    const Custom = (
      <SelectFakeProps selectedComponent={this.props.selectedComponent} />
    );

    const Types = (
      <TypesTable selectedComponent={this.props.selectedComponent} />
    );

    // const code = (
    //   <pre className="code">{this.props.componentProps.filecontents}</pre>
    // );

    const Code = null;

    const opts = { Component, Custom, Types, Code };
    return opts[this.props.selectedTab];
  };

  render() {
    return (
      <div className="cde">
        <div>
          <div className="cde-component-name">
            <div>{this.props.selectedComponent}</div>
            <div>{this.props.snapshots.map(i => <div>{i}</div>)}</div>
          </div>
          <Tabs />
          {this.renderSelectedTab()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  components: state.cde.components,
  selectedComponent: state.cde.selectedComponent,
  snapshots: state.cde.snapshots,
  fakeProps: state.cde.fakeProps,
  selectedTab: state.cde.selectedTab
});

export default connect(mapStateToProps, { fetchFakeProps })(CDE);
