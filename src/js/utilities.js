import APP from './constants';


export function RemoteGet(endpoint, callback) {
  const init = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const apiBase = `${APP.api.domain}${APP.api.basePath}`;

  fetch(`${apiBase}${endpoint}`, init)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
    });
}

