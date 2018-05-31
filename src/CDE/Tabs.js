// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { selectTab } from "../redux/actions/cde.js";

import "./Tabs.css";

class Tabs extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  renderTab = (tab, selectedTab, selectTab) => {
    return (
      <div
        className={tab === selectedTab ? "cde-selected-tab" : "cde-tab"}
        onClick={_ => this.props.selectTab(tab)}
      >
        {tab}
      </div>
    );
  };

  renderTabs = (tabs, selectedTab, selectTab) => {
    return tabs.map(tab => {
      return this.renderTab(tab, selectedTab, selectTab);
    });
  };

  render() {
    const { tabs, selectedTab, selectTab } = this.props;
    return (
      <div className="cde-tab-bar">
        {this.renderTabs(tabs, selectedTab, selectTab)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.cde.tabs,
  selectedTab: state.cde.selectedTab
});

export default connect(mapStateToProps, { selectTab })(Tabs);
