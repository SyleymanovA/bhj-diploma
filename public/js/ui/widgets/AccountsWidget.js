class AccountsWidget {
  constructor(element) {
    if (!element) throw new Error('Element not provided');
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    this.element.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }
      if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });
  }

  async update() {
    if (!User.current()) return;

    try {
      const response = await Account.list();
      if (response && response.success) {
        this.clear();
        const html = response.data.reduce((acc, item) => 
          acc + this.getAccountHTML(item), '');
        this.element.querySelector('.accounts-panel').innerHTML = html;
      }
    } catch (err) {
      console.error('Error loading accounts:', err);
    }
  }

  clear() {
    const panel = this.element.querySelector('.accounts-panel');
    if (panel) panel.innerHTML = '';
  }

  onSelectAccount(element) {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(acc => acc.classList.remove('active'));
    element.classList.add('active');
    App.showPage('transactions', {account_id: element.dataset.id});
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span>
          <span>${item.sum} ₽</span>
        </a>
      </li>
    `;
  }
}