let post  = ({ component, snapshot, name, snapshotChanges }) => ({
  path: `/snapshots/${component}/${snapshot}`,
  body: { name, snapshotChanges },
});


let put  = ({ component, snapshot, name, snapshotChanges }) => ({
  path: `/snapshots/${component}/${snapshot}`,
  body: { name, snapshotChanges }
});


let del  = ({ component, snapshot }) => ({
  path: `/snapshots/${component}/${snapshot}`,
});

let request = {
  post,
  put,
  del
}

let transform = (data, payload) => {
  return {
    data,
    errors: null,
  };
};

export { request, transform };
