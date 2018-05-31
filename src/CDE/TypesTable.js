// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchPropsAsts } from "../redux/actions/cde";

import "./TypesTable.css";

class TypesTable extends Component<Props> {
  componentDidMount() {
    this.props.fetchPropsAsts(this.props.selectedComponent);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedComponent === this.props.selectedComponent) return;
    this.props.fetchPropsAsts(this.props.selectedComponent);
  }

  renderTypesTable = propsAst => {
    if (!propsAst) return null;
    console.log("propsAst ", propsAst);

    return Object.keys(propsAst).map(i => {
      return (
        <tr>
          <td className="types-table-code">{i}</td>
          <td className="types-table-code">
            <pre>{propsAst[i].flowType.raw || propsAst[i].flowType.name}</pre>
          </td>
          <td>{propsAst[i].required.toString()}</td>
        </tr>
      );
    });
  };

  render() {
    if (
      !(
        this.props.propsAsts &&
        this.props.propsAsts[this.props.selectedComponent] &&
        this.props.propsAsts[this.props.selectedComponent].props
      )
    )
      return null;
    return (
      <div className="types-table">
        <table>
          <tr className="table-headers-container">
            <th align="left">PropName</th>
            <th align="left">Type</th>
            <th align="left">Required</th>
          </tr>
          {this.renderTypesTable(
            this.props.propsAsts[this.props.selectedComponent].props
          )}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  propsAsts: state.cde.propsAsts
});

export default connect(mapStateToProps, { fetchPropsAsts })(TypesTable);
