// @flow

import React, { Component } from "react";
import CustomOptions from './customOptions';

import "./SelectFakeProps.css";

class SelectFakeProps extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch(`http://localhost:3000/custom_types/${this.props.selectedComponent}`)
      .then(response => {
        return response.json();
      })
      .then(customTypes => {
        if (!customTypes) return;
        this.setState({ customTypes: customTypes });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedComponent === this.props.selectedComponent) return;
    fetch(`http://localhost:3000/custom_types/${this.props.selectedComponent}`)
      .then(response => {
        return response.json();
      })
      .then(customTypes => {
        if (!customTypes) return;
        this.setState({ customTypes: customTypes.default });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateCustomTypes = path => customType => {
    const replaced = { [path]: customType };
    const newCustomTypes = Object.assign({}, this.state.customTypes, replaced);
    this.setState({ customTypes: newCustomTypes });
  }

  postCustomTypes = () => {
    // send fetch post
    fetch(`http://localhost:3000/custom_types/${this.props.selectedComponent}`, {
      body: JSON.stringify(this.state.customTypes), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      // .then(response => response.json())
  }

  renderPropsPaths = () => {
    if (!this.state.customTypes) return null;
    return Object.keys(this.state.customTypes).map(path => {
      return (
        <div className="custom-types">
          <div>{path}</div>

          <CustomOptions currentOption={this.state.customTypes[path]} update={this.updateCustomTypes(path)}/>



        </div>
      );
    });
  };

  render() {
    console.log('this.state  ', this.state)
    return <div>{this.renderPropsPaths()} <div onClick={this.postCustomTypes}>SEND</div></div>;
  }
}

export default SelectFakeProps;
