// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import CustomOptions from "./CustomOptions";

import {
  // fetchCustomTypes,
  // postCustomTypes,
  // delCustomTypes
  handleSnapshots
} from "../redux/actions/cde.js";

import "./SelectFakeProps.css";

class SelectFakeProps extends Component<Props> {
  renderPropsPaths = () => {
    // TODO: Rewrite (clarity)
    const selectedSnapshot = this.props.snapshot;
    if (!selectedSnapshot) return null;

    return Object.keys(selectedSnapshot).map(path => {
      return (
        <div className="custom-types">
          <div>{path}</div>

          <CustomOptions
            currentOption={selectedSnapshot[path]}
            update={this.props.updateSnapshot}
            path={path}
          />
        </div>
      );
    });
  };

  render() {
    const { selectedComponent, selectedSnapshot, snapshotChanges } = this.props;

    return (
      <div>
        <div>{this.renderPropsPaths()}</div>

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
  // fetchCustomTypes,
  // postCustomTypes,
  // delCustomTypes
  handleSnapshots
})(SelectFakeProps);
