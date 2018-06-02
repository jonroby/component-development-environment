// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchComponentData } from "../redux/actions/cde";
import CDE from "./CDE";
import ComponentBar from "./ComponentBar";

import "./CDEScreen.css";

class CDEScreen extends Component {
  componentDidMount() {
    this.props.fetchComponentData({
      component: this.props.selectedComponent,
      snapshot: this.props.selectedSnapshot
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedSnapshot !== prevProps.selectedSnapshot ||
      this.props.selectedComponent !== prevProps.selectedComponent
    ) {
      this.props.fetchComponentData({
        component: this.props.selectedComponent,
        snapshot: this.props.selectedSnapshot
      });
    }
  }

  render() {
    return (
      <div className="cde-screen">
        <div className="cde-screen-padding-left" />
        <ComponentBar />
        <CDE />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedComponent: state.cde.selectedComponent,
  selectedSnapshot: state.cde.selectedSnapshot
});

export default connect(mapStateToProps, { fetchComponentData })(CDEScreen);
