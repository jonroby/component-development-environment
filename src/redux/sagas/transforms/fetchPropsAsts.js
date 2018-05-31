// fetch(`http://localhost:3000/props_asts/${this.props.selectedComponent}`)
//   .then(response => {
//     return response.json();
//   })
//   .then(flowAST => {
//     if (!flowAST) return;
//     this.setState({ flowAST: flowAST.props });
//   })
//   .catch(err => {
//     console.log(err);
//   });

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


