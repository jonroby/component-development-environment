// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import changeCase from "change-case";

import CustomOptions from "./CustomOptions";

import "./TypeSelector.css";

function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

function TypeSelector(props) {
  function renderInspector(flowAst, snapshot) {
    return Object.keys(flowAst.props).map(key => {
      return (
        <div className="key-value-container">
          <div className="key">{key}</div>
          <div className="value">
            {render(flowAst.props[key].flowType, key)}
          </div>
        </div>
      );
    });
  }

  function render(prop, path) {
    switch (changeCase.lowerCase(prop.name)) {
      case "number":
        return createNumber(prop, path + "/number");

      case "string":
        return createString(prop, path + "/string");

      case "boolean":
        return createBoolean(prop, path + "/boolean");

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

  function createNumber(prop, path) {
    return (
      <div className="key-value-pairs">
        <div className="flow-type">{prop.name}</div>
        <div>
          <CustomOptions
            snapshot={props.snapshot}
            path={path}
            currentOption={props.snapshot[path]}
          />
        </div>
      </div>
    );
  }

  function createString(prop, path) {
    return (
      <div className="key-value-pairs">
        <div>{prop.name}</div>
        <div>
          <CustomOptions
            path={path}
            snapshot={props.snapshot}
            currentOption={props.snapshot[path]}
          />
        </div>
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
      <div className="arr-obj-container">
        <div className="key">{prop.name}</div>

        <div className="value">{typesInArray.map(i => i)}</div>
      </div>
    );
  }

  function createObject(prop, path) {
    const { properties } = prop.signature;

    const propertiesList = properties.map(p => {
      return (
        <div className="key-value-pairs">
          <div className="type">{p.key}</div>

          <div>{render(p.value, path)}</div>
        </div>
      );
    });

    return (
      <div className="arr-obj-container">
        <div className="key">object</div>

        <div className="value">{propertiesList}</div>
      </div>
    );
  }

  function createFunction(prop, paths, path) {
    const { properties } = prop.signature;
    const ret = render(prop.signature.return);
    return () => ret;
  }

  return renderInspector(props.propsAst, props.snapshot);
}

export default TypeSelector;
