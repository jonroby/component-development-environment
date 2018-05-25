// @flow

import React, { Component } from "react";

import "./ComponentBar.css";

const ComponentBar = props => {
  const { components, selectedComponent, onSelect } = props;
  const displayComponents = (components, selected, onSelect) => {
    return components.map(comp => {
      console.log('comp ', comp)
      const selectedStyle = selected === comp ? "component-bar-links-selected" : "";
      console.log('selected ', selected)

      return (

        <li className={selectedStyle} onClick={e => onSelect(e, comp)}>
          {comp}
        </li>
      );
    });
  };

  return (
    <div className="component-bar-container">
      <div className="component-bar-header">
        <div>Component Development Environment</div>
      </div>

      <ul className="component-bar-links-list">
        {displayComponents(components, selectedComponent, onSelect)}
      </ul>
    </div>
  );
};

export default ComponentBar;
