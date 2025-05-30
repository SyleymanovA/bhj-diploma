function createRequest(options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    
    // Формируем URL с параметрами для GET-запросов
    if (options.method === 'GET' && options.data) {
      const params = new URLSearchParams();
      for (const key in options.data) {
        params.append(key, options.data[key]);
      }
      url += `?${params.toString()}`;
    }

    xhr.open(options.method, url);
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new Error('Network Error'));

    if (options.method === 'GET') {
      xhr.send();
    } else {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(options.data));
    }
  });
}