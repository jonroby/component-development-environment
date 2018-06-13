// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import Tabs from "./Tabs";
import ComponentView from "./ComponentView";
import TypesTable from "./TypesTable";
import SelectFakeProps from "./SelectFakeProps.js";
import { selectSnapshot } from "../redux/actions/cde";

class CDE extends Component {
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

    const Code = this.props.propsAst ? (
      <pre>
        <code>hello{this.props.propsAst.filecontents}</code>
      </pre>
    ) : null;

    const opts = { Component, Custom, Types, Code };
    return opts[this.props.selectedTab];
  };

  render() {
    return (
      <div className="cde">
        <Tabs />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedComponent: state.cde.selectedComponent,
  selectedTab: state.cde.selectedTab,
  snapshotNames: state.cde.snapshotNames,
  fakeProps: state.cde.fakeProps,
  selectedSnapshot: state.cde.selectedSnapshot,
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps, {
  selectSnapshot
})(CDE);
