const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList ();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountSelect = this.element.querySelector ('.accounts-select');
    if (accountSelect) {
      accountSelect.list ({}, (err, response) => {
        if (response && response.success) {
          accountSelect.innerHTML = '';
          response.data.forEach (account => {
            const option = document.createElement ('option');
            option.value = account.id;
            option.textContent = account.name;
            accountSelect.appendChild (option);
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create (data, (err, response) => {
      if (response && response.success) {
        this.element.reset ();
        const modalName = this.element.closest ('.modal').id === 'modal-new-income' ? 'newIncome' : 'newExpense';
        App.getModal (modalName).close ();
        App.update ();
        this.renderAccountsList ();
      } else {
        alert (response.error || 'ошибка создания транзакции');
      }
    });
  }
}