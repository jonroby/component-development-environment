// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";

import "./TypesTable.css";

class TypesTable extends Component<Props> {
  getColumns = () => {
    return [
      {
        title: "Prop",
        dataIndex: "prop",
        key: "prop",
        render: (text, record, index) => {
          return <pre>{text}</pre>;
        }
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (text, record, index) => {
          return <pre>{text}</pre>;
        }
      },
      {
        title: "Required",
        dataIndex: "required",
        key: "required"
      }
    ];
  };

  getDataSource = propsAst => {
    return Object.keys(propsAst.props).map((prop, i) => ({
      key: String(i),
      prop,
      type:
        propsAst.props[prop].flowType.raw || propsAst.props[prop].flowType.name,
      required: propsAst.props[prop].required.toString()
    }));
  };

  render() {
    const { propsAst } = this.props;
    if (!propsAst.props) return null;

    return (
      <div>
        <Table
          dataSource={this.getDataSource(propsAst)}
          columns={this.getColumns()}
          bordered
          pagination={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  propsAst: state.cde.propsAst
});

export default connect(mapStateToProps)(TypesTable);
