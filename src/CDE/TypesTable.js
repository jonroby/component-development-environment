// @flow

import React, { Component } from "react";
import { connect } from "react-redux";

import "./TypesTable.css";

class TypesTable extends Component<Props> {
  renderTypesTable = propsAst => {
    if (!propsAst) return null;

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
    if (!this.props.propsAst) return null;
    return (
      <div className="types-table">
        <table>
          <tr className="table-headers-container">
            <th align="left">PropName</th>
            <th align="left">Type</th>
            <th align="left">Required</th>
          </tr>
          {this.renderTypesTable(this.props.propsAst.props)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps)(TypesTable);
