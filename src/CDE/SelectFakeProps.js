// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import CustomOptions from "./CustomOptions";

import {
  handleSnapshots
} from "../redux/actions/cde.js";

import "./SelectFakeProps.css";

class SelectFakeProps extends Component<Props> {
  renderPropsPaths = (snapshot) => {
    if (!snapshot) return null;

    return Object.keys(snapshot).map(path => {
      if (snapshot[path] === "default" || snapshot[path].item) {
        return (
          <div className="custom-types">
            <div>{path}</div>

            <CustomOptions
              currentOption={snapshot[path]}
              update={this.props.updateSnapshot}
              path={path}
              />
          </div>
        );
      } else {
        return this.renderPropsPaths(snapshot[path]);
      }
    });
  };

  render() {
    const { selectedComponent, selectedSnapshot, snapshotChanges, snapshot } = this.props;

    return (
      <div>
        <div>{this.renderPropsPaths(snapshot)}</div>

        <div className="buttons-container">
          {selectedSnapshot === "default" ? null : (
            <div
              className="button"
              onClick={() =>
                this.props.handleSnapshots({
                  restMethod: "put",
                  component: selectedComponent,
                  snapshot: selectedSnapshot,
                  snapshotChanges
                })
              }
            >
              EDIT
            </div>
          )}

          <div
            className="button"
            onClick={() =>
              this.props.handleSnapshots({
                restMethod: "post",
                component: selectedComponent,
                snapshot: selectedSnapshot,
                snapshotChanges
              })
            }
          >
            NEW SNAPSHOT
          </div>
          {this.props.selectedSnapshot === "default" ? null : (
            <div
              className="button"
              onClick={() =>
                this.props.handleSnapshots({
                  restMethod: "del",
                  component: selectedComponent,
                  snapshot: selectedSnapshot
                })
              }
            >
              DELETE
            </div>
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
  snapshot: state.cde.snapshot
});

export default connect(mapStateToProps, {
  handleSnapshots
})(SelectFakeProps);
