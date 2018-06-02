let getOptions = () => {
  return `/custom_types`;
};

let transform = (data, payload) => {
  return {
    data: { customTypes: data },
    errors: null,
  };
};

export { getOptions, transform };

