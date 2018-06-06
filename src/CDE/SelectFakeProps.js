// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import CustomOptions from "./CustomOptions";

import { handleSnapshots } from "../redux/actions/cde.js";

import TypeSelector from "./TypeSelector";

import "./SelectFakeProps.css";

class SelectFakeProps extends Component<Props> {
  renderPropsPaths = snapshot => {
    if (!snapshot) return null;

    return <TypeSelector snapshot={snapshot} propsAst={this.props.propsAst} />;
  };

  render() {
    const {
      selectedComponent,
      selectedSnapshot,
      snapshotChanges,
      snapshot
    } = this.props;

    return (
      <div>
        <div>{this.renderPropsPaths(snapshot)}</div>

        <div className="buttons-container">
          {selectedSnapshot === "default" ? null : (
            <Button
              onClick={() =>
                this.props.handleSnapshots({
                  restMethod: "put",
                  component: selectedComponent,
                  snapshot: selectedSnapshot,
                  snapshotChanges
                })
              }
            >
              Edit
            </Button>
          )}

          <Button
            type="primary"
            onClick={() =>
              this.props.handleSnapshots({
                restMethod: "post",
                component: selectedComponent,
                snapshot: selectedSnapshot,
                snapshotChanges
              })
            }
          >
            New
          </Button>

          {this.props.selectedSnapshot === "default" ? null : (
            <Button
              type="danger"
              onClick={() =>
                this.props.handleSnapshots({
                  restMethod: "del",
                  component: selectedComponent,
                  snapshot: selectedSnapshot
                })
              }
              ghost
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customTypes: state.cde.customTypes,
  selectedComponent: state.cde.selectedComponent,
  selectedSnapshot: state.cde.selectedSnapshot,
  snapshotChanges: state.cde.snapshotChanges,
  snapshot: state.cde.snapshot,
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps, {
  handleSnapshots
})(SelectFakeProps);
