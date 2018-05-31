// const query = query => () => {
//   return fetch("http://localhost:9002/graphql", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query })
//   }).then(function(response) {
//     return response.json();
//   });
// };

// const mutation = () => {};

const get = path => {
  return fetch(`http://localhost:3000${path}`)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
};

const post = url => () => {};

export { get, post };
