// @flow

import React, { Component } from "react";

import "./TypesTable.css";

class TypesTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTypesTable = componentProps => {
    return Object.keys(componentProps).map(i => {
      return (
        <tr>
          <td className="types-table-code">{i}</td>
          <td className="types-table-code">
            {componentProps[i].flowType.raw || componentProps[i].flowType.name}
          </td>
          <td>{componentProps[i].required.toString()}</td>
          <td>{componentProps[i].description}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="types-table">
        <table>
          <tr className="table-headers-container">
            <th align="left">PropName</th>
            <th align="left">Type</th>
            <th align="left">Required</th>
            <th align="left">Description</th>
          </tr>
          {this.renderTypesTable(this.props.componentProps)}
        </table>
      </div>
    );
  }
}

export default TypesTable;
