class Sidebar {
  constructor(element) {
    if (!element) throw new Error('Element not provided');
    this.element = element;
    this.initToggleButton();
    this.initAuthLinks();
  }

  initToggleButton() {
    const toggleButton = this.element.querySelector('.sidebar-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', e => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-collapse');
        document.body.classList.toggle('sidebar-open');
      });
    }
  }

  initAuthLinks() {
    const loginButton = this.element.querySelector('.login-btn');
    const registerButton = this.element.querySelector('.register-btn');
    const logoutButton = this.element.querySelector('.logout-btn');

    if (loginButton) {
      loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('login').open();
      });
    }

    if (registerButton) {
      registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('register').open();
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}