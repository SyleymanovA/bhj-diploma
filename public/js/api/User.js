class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    return JSON.parse(userJson);
  }

  static async fetch() {
    return createRequest({
      url: `${this.URL}/current`,
      method: 'GET'
    });
  }

  static async login(data) {
    const response = await createRequest({
      url: `${this.URL}/login`,
      method: 'POST',
      data
    });
    if (response && response.user) {
      this.setCurrent(response.user);
    }
    return response;
  }

  static async register(data) {
    const response = await createRequest({
      url: `${this.URL}/register`,
      method: 'POST',
      data
    });
    if (response && response.user) {
      this.setCurrent(response.user);
    }
    return response;
  }

  static async logout() {
    const response = await createRequest({
      url: `${this.URL}/logout`,
      method: 'POST'
    });
    this.unsetCurrent();
    return response;
  }
}