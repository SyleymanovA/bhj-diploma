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
    const loginBtn = this.element.querySelector('.menu-item_login');
    const registerBtn = this.element.querySelector('.menu-item_register');
    const logoutBtn = this.element.querySelector('.menu-item_logout');

   if (loginBtn) {
      loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('login').open();
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('register').open();
      });
    } 
    
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        await User.logout();
        App.setState('init');
      });
    }
  }
}