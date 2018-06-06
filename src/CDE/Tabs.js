// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";
import ComponentView from "./ComponentView";
import TypesTable from "./TypesTable";
import SelectFakeProps from "./SelectFakeProps";

import { selectTab } from "../redux/actions/cde.js";

import "./Tabs.css";

const TabPane = Tabs.TabPane;

class TabsView extends Component {
  renderTab = (tabs, selectedTab, selectTab) => {
    return tabs.map(tab => {
      return (
        <TabPane tab={tab} key={tab}>
          {tab}
        </TabPane>
      );
    });
  };

  renderTabs = (tabs, selectedTab, selectTab) => {
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
      <pre className="code">{this.props.propsAst.filecontents}</pre>
    ) : null;

    return (
      <Tabs defaultActiveKey="component" onChange={selectTab}>
        <TabPane tab="Component" key="Component">
          {Component}
        </TabPane>
        <TabPane tab="Custom" key="Custom">
          {Custom}
        </TabPane>
        <TabPane tab="Types" key="types">
          {Types}
        </TabPane>
        <TabPane tab="Code" key="code">
          {Code}
        </TabPane>
      </Tabs>
    );
  };

  render() {
    const { tabs, selectedTab, selectTab } = this.props;
    return this.renderTabs(tabs, selectedTab, selectTab);
  }
}

const mapStateToProps = state => ({
  tabs: state.cde.tabs,
  selectedTab: state.cde.selectedTab,
  fakeProps: state.cde.fakeProps,
  propsAst: state.cde.propsAst,
  selectedComponent: state.cde.selectedComponent
});

export default connect(mapStateToProps, { selectTab })(TabsView);
