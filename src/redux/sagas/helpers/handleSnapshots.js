let post  = ({ component, snapshot, snapshotChanges }) => ({
  path: `/snapshots/${component}/${snapshot}`,
  body: { snapshotChanges },
});


let put  = ({ component, snapshot, snapshotChanges }) => ({
  path: `/snapshots/${component}/${snapshot}`,
  body: { snapshotChanges }
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
