// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import changeCase from "change-case";
import { Collapse, Checkbox, Button } from "antd";
import CustomOptions from "./CustomOptions";
import "./TypeSelector.css";
const Panel = Collapse.Panel;

function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function TypeSelector(props) {
  function renderInspector(flowAst, snapshot) {
    return Object.keys(flowAst.props).map((key, i) => {
      const required = flowAst.props[key].required;
      return (
        <Panel header={key} key={`${key}${i}`}>
          <div className="prop-type-container">
            <Checkbox onChange={onChange} disabled={required}>
              Maybe
            </Checkbox>
            <div className="prop-type">
              {render(flowAst.props[key].flowType, key)}
            </div>
          </div>
        </Panel>
      );
    });
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function render(prop, path) {
    switch (changeCase.lowerCase(prop.name)) {
      case "number":
        return createPrimitive(prop, path + "/number");

      case "string":
        return createPrimitive(prop, path + "/string");

      case "boolean":
        return createPrimitive(prop, path + "/boolean");

      // case "void":
      //   return null; // undefined?

      case "array":
        return createArray(prop, path + "/array");

      case "signature":
        if (prop.type === "object") {
          return createObject(prop, path + "/object");
        }

        return null;

      // else if (prop.type === "function") {
      //   return createFunction(prop, paths, path + '/function');
      // }

      // case "union":
      //   return createUnion(prop, paths, path + '/union');

      // case "literal":
      //   // TODO: react-docgen changes true to 'true', 1 to '1', 'hello' to '"hello"'
      //   return createLiteral(prop, paths, path + '/literal');

      default:
        console.log("No match.");
    }
  }

  function createPrimitive(prop, path) {
    return (
      <div className="primitive-container">
        <div className="key">
          <Button type={prop.nullable ? "primary" : "dashed"} size={"small"}>
            {prop.name}
          </Button>
        </div>

        <CustomOptions
          snapshot={props.snapshot}
          path={path}
          currentOption={props.snapshot[path]}
        />
      </div>
    );
  }

  function createBoolean(prop) {
    // return (
    //   <div>
    //     <div>{prop.name}</div>
    //   </div>
    // );
  }

  function createLiteral(prop, paths, path) {
    // if (prop.elements) {
    //   return prop.elements.reduce(p => {
    //     return render(p, paths, path);
    //   });
    // }
    // return { [path]: "default" };
  }

  function createUnion(prop, paths, path) {
    // return render(prop.elements[0], paths, path);
    // const red = prop.elements.reduce((acc, curr) => {
    //   let el = render(curr, paths, path);
    //   return Object.assign({}, acc, el);
    // }, {});
    // return { [path]: red };
  }

  function createArray(prop, path) {
    const typesInArray = prop.elements.map(type => {
      return render(type, path);
    });

    return (
      <div className="arr-container">
        <div className="key">
          <Button type={prop.nullable ? "primary" : "dashed"} size={"small"}>
            {prop.name}
          </Button>
        </div>

        <div className="value">{typesInArray.map(i => i)}</div>
      </div>
    );
  }

  function createObject(prop, path) {
    const { properties } = prop.signature;

    const propertiesList = properties.map(p => {
      return (
        <div className="obj-container">
          <div className="key">
            <Button
              type={!p.value.required ? "primary" : "dashed"}
              size={"small"}
            >
              {p.key}
            </Button>
          </div>

          <div>{render(p.value, path)}</div>
        </div>
      );
    });

    return (
      <div className="arr-container">
        <div className="key">
          <Button type={"dashed"} size={"small"}>
            object
          </Button>
        </div>
        <div className="value">{propertiesList}</div>
      </div>
    );
  }

  function createFunction(prop, paths, path) {
    const { properties } = prop.signature;
    const ret = render(prop.signature.return);
    return () => ret;
  }

  return (
    <div>
      <Collapse>{renderInspector(props.propsAst, props.snapshot)}</Collapse>
    </div>
  );
}

export default TypeSelector;
