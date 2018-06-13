import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "antd";
import { AutoComplete } from "antd";
import { updateComponentSearchInput } from "../redux/actions/cde";

import "./ComponentSearch.css";

class ComponentSearch extends Component {
  render() {
    return (
      <div className="input-container">
        <Input
          placeholder="Search components"
          value={this.props.componentSearchInput}
          onChange={event =>
            this.props.updateComponentSearchInput(event.target.value)
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  componentSearchInput: state.cde.componentSearchInput,
  componentNames: state.cde.componentNames
});

export default connect(mapStateToProps, {
  updateComponentSearchInput
})(ComponentSearch);
