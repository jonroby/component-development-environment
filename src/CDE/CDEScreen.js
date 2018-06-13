// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { fetchComponentData } from "../redux/actions/cde";
import CDE from "./CDE";
import ComponentMenu from "./ComponentMenu";
import ComponentSearch from './ComponentSearch';
import "./CDEScreen.css";

const { Header, Footer, Sider, Content } = Layout;

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
      <div>
        <Layout>
          <Sider theme='light' width={256} style={{borderRight: '1px solid #e8e8e8'}}>
            <div className="cde-component-name">
              <div>BuildingBlocks</div>
            </div>

            <ComponentSearch />

            <ComponentMenu />
          </Sider>
          <Layout>
            <Header style={{backgroundColor: 'white', fontSize: '16px'}}>{this.props.selectedComponent}</Header>
            <Content style={{backgroundColor: 'white', paddingLeft: '50px', paddingRight: '50px'}}><CDE /></Content>
            <Footer style={{backgroundColor: 'white'}}>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedComponent: state.cde.selectedComponent,
  selectedSnapshot: state.cde.selectedSnapshot
});

export default connect(mapStateToProps, { fetchComponentData })(CDEScreen);
