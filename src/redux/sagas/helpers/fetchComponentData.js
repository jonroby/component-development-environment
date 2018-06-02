let get = ({ component, snapshot }) => ({
  path: `/component_data/${component}?snapshot=${snapshot}`
});

let request = { get };

let transform = (data, payload) => {
  return {
    data,
    errors: null,
  };
};

export { request, transform };

