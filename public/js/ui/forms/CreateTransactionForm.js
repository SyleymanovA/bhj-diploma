class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  async renderAccountsList() {
  const accountSelect = this.element.querySelector('.accounts-select');
  accountSelect.innerHTML = '';

  Account.list({}, (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    accountSelect.innerHTML = response.data.reduce((html, account) => {
      return html + `<option value="${account.id}">${account.name}</option>`;
    }, '');
  });
  }

  async onSubmit(data) {
    try {
      const response = await Transaction.create(data);
      if (response && response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal').id.includes('income') 
          ? 'newIncome' 
          : 'newExpense').close();
        App.update();
      }
    } catch (err) {
      console.error('Transaction error:', err);
    }
  }
}