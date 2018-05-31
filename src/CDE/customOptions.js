// @flow

import React, { Component } from "react";
import options from "./fake_options";

import "./CustomOptions.css";

class CustomOptions extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: "default",
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
    if (this.props === prevProps) return;
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
                  this.props.update({ section: option, item: suboption });
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

export default CustomOptions;
