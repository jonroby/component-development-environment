let getOptions = payload => {
  return `/fake_props/${payload}`;
};

let transform = (data, payload) => {
  return {
    data: { [payload]: data },
    errors: null,
  };
};

export { getOptions, transform };

