class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  async renderAccountsList() {
    const select = this.element.querySelector('.accounts-select');
    if (!select) return;

    try {
      const response = await Account.list();
      if (response && response.success) {
        select.innerHTML = response.data.map(account => 
          `<option value="${account.id}">${account.name}</option>`
        ).join('');
      }
    } catch (err) {
      console.error('Error loading accounts:', err);
    }
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