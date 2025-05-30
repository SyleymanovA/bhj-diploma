function createRequest(options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    const method = options.method || 'GET';
    let url = options.url;

    if (method === 'GET' && options.data) {
      const params = new URLSearchParams();
      for (let key in options.data) {
        params.append(key, options.data[key]);
      }
      url += '?' + params.toString();
    }

    xhr.open(method, url);
    xhr.withCredentials = true;

    xhr.addEventListener('load', () => {
      if (xhr.status < 400) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network Error'));
    });

    if (method !== 'GET' && options.data) {
      const formData = new FormData();
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.send(formData);
    } else {
      xhr.send();
    }
  });
}