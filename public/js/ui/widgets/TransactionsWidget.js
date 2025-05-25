/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 */
class TransactionsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью registerEvents()
   */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на кнопку .create-income открывает окно #modal-new-income
   * При нажатии на кнопку .create-expense открывает окно #modal-new-expense
   */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      const incomeBtn = e.target.closest('.create-income');
      const expenseBtn = e.target.closest('.create-expense');
      
      if (incomeBtn) {
        App.getModal('newIncome').open();
      } else if (expenseBtn) {
        App.getModal('newExpense').open();
      }
    });
  }
}