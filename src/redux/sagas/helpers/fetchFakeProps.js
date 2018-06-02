let getOptions = ({ component, snapshot }) => {
  return `/fake_props/${component}?snapshot=${snapshot}`;
};

let transform = (data, payload) => {
  return {
    data: { [payload.component]: data },
    errors: null,
  };
};

export { getOptions, transform };

