let getOptions = payload => {
  return `/props_asts/${payload}`;
};

let transform = (data, payload) => {
  return {
    data: { [payload]: data },
    errors: null,
  };
};

export { getOptions, transform };


