let delOptions = ({ selectedComponent, selectedSnapshot }) => {
  return `/custom_types/${selectedComponent}/${selectedSnapshot}`;
};

let transform = (data, payload) => {
  return {
    data: { customTypes: data },
    errors: null,
  };
};

export { delOptions, transform };

