import React from "react";
import * as components from "../components/index";

import "./ComponentView.css";

function ComponentView(props) {
  const selectedComponent =
    props.selectedComponent && components[props.selectedComponent];

  const element =
    selectedComponent && props.fakeProps
      ? React.createElement(
          selectedComponent,
          props.fakeProps,
          null
        )
      : null;

  return (
    <div className="cde-component-container">
      <div className="cde-component-outer">
        <div className="cde-component">{element}</div>
      </div>
    </div>
  );
}

export default ComponentView;
