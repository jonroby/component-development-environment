// path: custom_types/${this.props.selectedComponent}
// body: this.state.customTypes

let postOptions = payload => ({
  path: `/custom_types/${payload.selectedComponent}`,
  body: payload
});

let transform = (data, payload) => {
  return {
    data,
    errors: null,
  };
};

export { postOptions, transform };
