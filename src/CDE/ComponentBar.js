// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { selectComponent } from "../redux/actions/cde";

import "./ComponentBar.css";

class ComponentBar extends Component {
  // const { components, selectedComponent, onSelect } = props;
  displayComponents = (components, selected, selectComponent) => {
    if (!components) return null;
    return components.map(comp => {
      const selectedStyle =
        selected === comp ? "component-bar-links-selected" : "";
      return (
        <li className={selectedStyle} onClick={e => selectComponent(comp)}>
          {comp}
        </li>
      );
    });
  };

  render() {
    const { componentNames, selectedComponent, selectComponent } = this.props;
    return (
      <div className="component-bar-container">
        <div className="component-bar-header">
          <div>Component</div>
          <div>Development</div>
          <div>Environment</div>
        </div>

        <ul className="component-bar-links-list">
          {this.displayComponents(
            componentNames,
            selectedComponent,
            selectComponent
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  componentNames: state.cde.componentNames,
  selectedComponent: state.cde.selectedComponent
});

export default connect(mapStateToProps, { selectComponent })(ComponentBar);
