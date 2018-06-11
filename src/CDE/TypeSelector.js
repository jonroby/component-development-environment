// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import changeCase from "change-case";
import { Collapse, Checkbox, Button, Radio } from "antd";
import { updateSnapshot } from "../redux/actions/cde.js";
import CustomOptions from "./CustomOptions";
import "./TypeSelector.css";
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

class TypeSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderInspector = (flowAst, snapshot) => {
    return Object.keys(flowAst.props).map((key, i) => {
      const required = flowAst.props[key].required;
      const path = `${key}`;

      let buttonType;
      if (
        this.props.snapshotChanges[path] &&
        this.props.snapshotChanges[path].isPresent
      ) {
        buttonType = true;
      } else if (
        this.props.snapshotChanges[path] &&
        !this.props.snapshotChanges[path].isPresent
      ) {
        buttonType = false;
      } else if (this.props.snapshot[path] === undefined) {
        buttonType = true;
      } else if (this.props.snapshot[path] === "default") {
        buttonType = true;
      } else if (this.props.snapshot[path].isPresent) {
        buttonType = true;
      } else if (!this.props.snapshot[path].isPresent) {
        buttonType = false;
      }

      return (
        <Panel header={key} key={`${key}${i}`}>
          <div className="prop-type-container">
            <Checkbox
              onChange={() => this.onClickIsPresent(path, this.props.snapshot)}
              disabled={required}
              checked={buttonType}
            >
              Maybe
            </Checkbox>
            <div className="prop-type">
              {this.caseRender(flowAst.props[key].flowType, key)}
            </div>
          </div>
        </Panel>
      );
    });
  };

  onClickUnionSelection = (path, snapshot) => {
    const curr = snapshot[path];
    let isSelected;

    if (
      this.props.snapshotChanges[path] &&
      this.props.snapshotChanges[path].isSelected
    ) {
      isSelected = false;
    } else if (
      this.props.snapshotChanges[path] &&
      !this.props.snapshotChanges[path].isSelected
    ) {
      isSelected = true;
    } else if (curr.isSelected) {
      isSelected = false;
    } else if (!curr.isSelected) {
      isSelected = true;
    }

    this.props.updateSnapshot({
      [path]: { isSelected }
    });
  };

  onClickIsPresent = (path, snapshot) => {
    if (this.props.snapshotChanges[path]) {
      const isPresent = !this.props.snapshotChanges[path].isPresent;
      this.props.updateSnapshot({
        [path]: {
          ...this.props.snapshotChanges[path],
          isPresent: isPresent
        }
      });
    } else {
      const isPresent = !this.props.snapshot[path].isPresent;
      this.props.updateSnapshot({
        [path]: {
          ...this.props.snapshotChanges[path],
          isPresent: isPresent
        }
      });
    }
  };

  caseRender(prop, path) {
    switch (changeCase.lowerCase(prop.name)) {
      case "number":
        return this.createPrimitive(prop, path + "/number");

      case "string":
        return this.createPrimitive(prop, path + "/string");

      case "boolean":
        return this.createPrimitive(prop, path + "/boolean");

      // case "void":
      //   return null; // undefined?

      case "array":
        return this.createArray(prop, path + "/array");

      case "signature":
        if (prop.type === "object") {
          return this.createObject(prop, path + "/object");
        }

        return null;

      // else if (prop.type === "function") {
      //   return createFunction(prop, paths, path + '/function');
      // }

      case "union":
        return this.createUnion(prop, path + "/union");

      // case "literal":
      //   // TODO: react-docgen changes true to 'true', 1 to '1', 'hello' to '"hello"'
      //   return createLiteral(prop, paths, path + "/literal");

      default:
        console.log("No match.");
    }
  }

  renderButton = (mustBePresent, path, buttonText) => {
    // TODO: CLEAN THIS UP!
    let buttonType;
    if (mustBePresent) {
      buttonType = "dashed";
    } else if (
      this.props.snapshotChanges[path] &&
      this.props.snapshotChanges[path].isPresent
    ) {
      buttonType = "primary";
    } else if (
      this.props.snapshotChanges[path] &&
      !this.props.snapshotChanges[path].isPresent
    ) {
      buttonType = "default";
    } else if (this.props.snapshot[path] === undefined) {
      buttonType = "primary";
    } else if (this.props.snapshot[path].section === "") {
      buttonType = "primary";
    } else if (this.props.snapshot[path].isPresent) {
      buttonType = "primary";
    } else if (!this.props.snapshot[path].isPresent) {
      buttonType = "default";
    }

    return (
      <Button
        onClick={
          !mustBePresent
            ? () => this.onClickIsPresent(path, this.props.snapshot)
            : () => {}
        }
        type={buttonType}
        size={"small"}
      >
        {buttonText}
      </Button>
    );
  };

  createPrimitive = (prop, path) => {
    return (
      <div className="primitive-container">
        <div className="key">
          {this.renderButton(!prop.nullable, path, prop.name)}
        </div>

        <CustomOptions
          snapshot={this.props.snapshot}
          path={path}
          currentOption={this.props.snapshot[path]}
        />
      </div>
    );
  };

  createBoolean = prop => {
    // return (
    //   <div>
    //     <div>{prop.name}</div>
    //   </div>
    // );
  };

  createLiteral = (prop, paths, path) => {
    // if (prop.elements) {
    //   return prop.elements.reduce(p => {
    //     return render(p, paths, path);
    //   });
    // }
    // return { [path]: "default" };
  };

  //             checked={!this.props.snapshot[path].unselected}

  createUnion = (prop, path) => {
    const elements = prop.elements.map(el => {
      let isSelected;
      let pathWithEl = path + `/${el.name}`;

      if (this.props.snapshotChanges[pathWithEl]) {
        isSelected = this.props.snapshotChanges[pathWithEl].isSelected;
      } else {
        isSelected = this.props.snapshot[pathWithEl].isSelected;
      }

      return (
        <div className="obj-container">
          <Radio
            onClick={() =>
              this.onClickUnionSelection(pathWithEl, this.props.snapshot)
            }
            checked={isSelected}
          />

          <div>{this.caseRender(el, path)}</div>
        </div>
      );
    });

    return (
      <div className="arr-container">
        <div className="key">
          {this.renderButton(!prop.nullable, path, "union")}
        </div>

        <div className="value">{elements}</div>
      </div>
    );
  };

  createArray = (prop, path) => {
    const typesInArray = prop.elements.map(type => {
      return this.caseRender(type, path);
    });

    return (
      <div className="arr-container">
        <div className="key">
          {this.renderButton(!prop.nullable, path, prop.name)}
        </div>

        <div className="value">{typesInArray.map(i => i)}</div>
      </div>
    );
  };

  createObject = (prop, path) => {
    const { properties } = prop.signature;

    const propertiesList = properties.map(p => {
      return (
        <div className="obj-container">
          <div className="key">
            {this.renderButton(p.value.required, path + `/${p.key}`, p.key)}
          </div>

          <div>{this.caseRender(p.value, path + `/${p.key}`)}</div>
        </div>
      );
    });

    return (
      <div className="arr-container">
        <div className="key">
          {this.renderButton(prop.required, path, "object")}
        </div>
        <div className="value">{propertiesList}</div>
      </div>
    );
  };

  createFunction = (prop, paths, path) => {
    const { properties } = prop.signature;
    const ret = this.caseRender(prop.signature.return);
    return () => ret;
  };

  render() {
    return (
      <div>
        <Collapse>
          {this.renderInspector(this.props.propsAst, this.props.snapshot)}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  snapshot: state.cde.snapshot,
  snapshotChanges: state.cde.snapshotChanges
});

export default connect(mapStateToProps, { updateSnapshot })(TypeSelector);
