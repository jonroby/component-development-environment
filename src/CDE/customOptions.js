// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon } from "antd";
import options from "./fake_options";
import { updateSnapshot } from "../redux/actions/cde.js";
import "./CustomOptions.css";
const SubMenu = Menu.SubMenu;

class CustomOptions extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: "",
      selectedOption: "",
      selectedSuboption: "",
      showOptions: false
    };
  }

  componentDidMount() {
    this.setState({
      currentOption:
        (this.props.currentOption && this.props.currentOption.item) || "default"
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.state.currentOption !== "" &&
      this.props.currentOption === prevProps.currentOption
    )
      return;
    this.setState({
      currentOption:
        (this.props.currentOption && this.props.currentOption.item) || "default"
    });
  }

  render() {
    const onClick = (option, suboption) => {
      this.props.updateSnapshot({
        [this.props.path]: { section: option, item: suboption }
      });

      this.setState({
        currentOption: suboption,
        showOptions: false,
        selectedOption: "",
        selectedSuboption: ""
      });
    };

    const menu = () => {
      const submenus = () => {
        return Object.keys(options).map(option => {
          return (
            <SubMenu title={option}>
              {options[option].map(suboption => (
                <Menu.Item onClick={() => onClick(option, suboption)}>
                  {suboption}
                </Menu.Item>
              ))}
            </SubMenu>
          );
        });
      };

      return <Menu>{submenus()}</Menu>;
    };

    return (
      <div className="options">
        <Dropdown overlay={menu()}>
          <a className="ant-dropdown-link" href="#">
            {this.state.currentOption} <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

export default connect(null, { updateSnapshot })(CustomOptions);
