// @flow

import React, { Component } from "react";
import { connect } from 'react-redux';
import options from "./fake_options";
import { updateSnapshot } from '../redux/actions/cde.js';

import "./CustomOptions.css";

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
    if (this.state.currentOption !== "" && (this.props.currentOption === prevProps.currentOption)) return;
    this.setState({
      currentOption:
        (this.props.currentOption && this.props.currentOption.item) || "default"
    });
  }

  renderOptions = () => {
    if (!this.state.showOptions) return null;
    return Object.keys(options).map(option => {
      const renderSuboptions = suboptions => {
        return suboptions.map(suboption => {
          return (
            <div className="suboption">
              <div
                onClick={() => {
                  this.props.updateSnapshot({
                    [this.props.path]: { section: option, item: suboption }
                  });
                  this.setState({
                    currentOption: suboption,
                    showOptions: false,
                    selectedOption: "",
                    selectedSuboption: ""
                  });
                }}
              >
                {suboption}
              </div>
            </div>
          );
        });
      };

      return (
        <div className="menu">
          <div className="options">
            <div
              className="option"
              onClick={() => {
                this.setState({
                  selectedOption:
                    this.state.selectedOption === option ? "" : option
                });
              }}
            >
              <div>&#9655;</div>
              <div>{option}</div>
            </div>
            {this.state.selectedOption === option
              ? renderSuboptions(options[option])
              : null}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="options">
        <div
          onClick={() =>
            this.setState({ showOptions: !this.state.showOptions })
          }
        >
          {this.state.currentOption}
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

export default connect(null, { updateSnapshot })(CustomOptions);
