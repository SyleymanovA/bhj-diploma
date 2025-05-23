class Entity {
  static url = '';

  static list(data, callback = (f) => f) {
    return createRequest({
      url: this.url,
      data,
      method: 'GET',
    }).then(callback);
  }

  static create(data, callback = (f) => f) {
    return createRequest({
      url: this.url,
      data,
      method: 'PUT',
    }).then(callback);
  }

  static remove(data, callback = (f) => f) {
    return createRequest({
      url: this.url,
      data,
      method: 'DELETE',
    }).then(callback);
  }
}
