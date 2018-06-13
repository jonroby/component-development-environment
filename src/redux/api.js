const env = 'http://localhost:3001';

const get = ({ path }) => {
  return fetch(`${env}${path}`)
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
};

const post = ({ path, body }) => {
  return fetch(`${env}${path}`, {
    body: JSON.stringify(body), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "content-type": "application/json"
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
};

const put = ({ path, body }) => {
  return fetch(`${env}${path}`, {
    body: JSON.stringify(body), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "content-type": "application/json"
    },
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // *client, no-referrer
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
};

const del = ({ path }) => {
  return fetch(`${env}${path}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    });
};

export default { get, post, put, del };
