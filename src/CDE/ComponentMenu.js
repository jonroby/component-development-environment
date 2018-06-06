// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { selectComponent, selectSnapshot } from "../redux/actions/cde";
// import "./ComponentMenu.css";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class ComponentMenu extends Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  state = {
    openKeys: ["sub1"]
  };

  onOpenChange = openKeys => {
    console.log("openKeys ", openKeys);
    const latestOpenKey = openKeys.find(
      key => this.props.componentNames.indexOf(key) === -1
    );
    if (this.props.componentNames.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  renderComponents = (componentNames, selected, selectComponent) => {
    if (!componentNames) return null;

    return componentNames.map((componentName, i) => {
      return (
        <SubMenu
          key={componentName}
          title={
            <span>
              <span>{componentName}</span>
            </span>
          }
          onTitleClick={this.props.selectComponent}
        >
          {this.renderSnapshots(componentName)}
        </SubMenu>
      );
    });
  };

  renderSnapshots = component => {
    if (!this.props.snapshotNames || component !== this.props.selectedComponent)
      return null;

    return this.props.snapshotNames.map((snapshotName, i) => {
      const key = i === 0 ? "default" : `snapshot${i}`;
      return (
        <Menu.Item onClick={this.props.selectSnapshot} key={key}>
          {snapshotName}
        </Menu.Item>
      );
    });
  };

  render() {
    const { componentNames, selectedComponent, selectComponent } = this.props;

    return (
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={["default"]}
        mode="inline"
        openKeys={[this.props.selectedComponent]}
        onOpenChange={this.onOpenChange}
        forceSubMenuRender
      >
        {this.renderComponents(
          componentNames,
          selectedComponent,
          selectComponent
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  componentNames: state.cde.componentNames,
  selectedComponent: state.cde.selectedComponent,
  snapshotNames: state.cde.snapshotNames,
  selectedSnapshot: state.cde.selectedSnapshot
});

export default connect(mapStateToProps, { selectComponent, selectSnapshot })(
  ComponentMenu
);
