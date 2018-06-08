// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Alert, Button, Divider, message } from "antd";
import CustomOptions from "./CustomOptions";

import { handleSnapshots } from "../redux/actions/cde.js";

import TypeSelector from "./TypeSelector";

import "./SelectFakeProps.css";

const displayStatus = status => action => {
  const actions = {
    post: "created",
    put: "edited",
    del: "deleted"
  };

  if (status === "success") message.success(`Snapshot ${actions[action]}`);
  if (status === "failure")
    message.error(`Snapshot was not ${actions[action]}`);
};

class SelectFakeProps extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.selectedSnapshot
    };
  }

  renderPropsPaths = snapshot => {
    if (!snapshot) return null;

    return <TypeSelector snapshot={snapshot} propsAst={this.props.propsAst} />;
  };

  displayWarning = () => {};

  componentDidUpdate(prevProps) {
    if (
      (this.props.snapshotStatus.status !== "none" &&
        this.props.snapshotStatus.status !== prevProps.snapshotStatus.status) ||
      this.props.snapshotStatus.action !== prevProps.snapshotStatus.action
    ) {
      displayStatus(this.props.snapshotStatus.status)(
        this.props.snapshotStatus.action
      );
    }

    console.log("prevProps ", prevProps);
    console.log("this.props ", this.props);

    if (
      prevProps.selectedComponent !== this.props.selectedComponent ||
      prevProps.selectedSnapshot !== this.props.selectedSnapshot
    ) {
      this.setState({ value: this.props.selectedSnapshot });
    }
  }

  render() {
    const {
      selectedComponent,
      selectedSnapshot,
      snapshotChanges,
      snapshot
    } = this.props;

    console.log("value ", this.state.value);

    return (
      <div>
        <div className="buttons-container">
          <Input
            defaultValue={this.state.value}
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
          <Button
            type="primary"
            onClick={() =>
              this.props.handleSnapshots({
                restMethod: "post",
                component: selectedComponent,
                name: this.state.value,
                snapshot: selectedSnapshot,
                snapshotChanges
              })
            }
          >
            New
          </Button>
          {selectedSnapshot === "default" ? null : (
            <Button
              onClick={() =>
                this.props.handleSnapshots({
                  restMethod: "put",
                  component: selectedComponent,
                  name: this.state.value,
                  snapshot: selectedSnapshot,
                  snapshotChanges
                })
              }
            >
              Edit
            </Button>
          )}

          {this.props.selectedSnapshot === "default" ? null : (
            <div>
              <div className="vertical-divider" />

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
            </div>
          )}
        </div>

        {true ? (
          <Alert
            message="Warning"
            description="This snapshot is out of date with current prop types."
            type="warning"
            showIcon
          />
        ) : null}

        <div>{this.renderPropsPaths(snapshot)}</div>
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
  snapshotStatus: state.cde.snapshotStatus,
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps, {
  handleSnapshots
})(SelectFakeProps);
