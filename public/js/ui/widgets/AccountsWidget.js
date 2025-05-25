/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий через registerEvents()
   * Вызывает update() для получения списка счетов и отображения их
   */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не передан');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно #modal-new-account
   * для создания нового счёта
   */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }
      
      if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current() должен возвращать объект пользователя)
   * Получает список счетов через Account.list()
   * Отображает полученный список с помощью renderItem()
   */
  update() {
    if (!User.current()) return;

    Account.list({}, (err, response) => {
      if (response && response.success) {
        this.clear();
        response.data.forEach(item => this.renderItem(item));
      }
    });
  }

  /**
   * Очищает список ранее отображённых счетов
   */
  clear() {
    const accountsList = this.element.querySelector('.accounts-panel');
    if (accountsList) {
      accountsList.innerHTML = '';
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта класс .active
   * Вызывает TransactionsPage.render() с account_id
   */
  onSelectAccount(element) {
    if (this.currentActiveAccount) {
      this.currentActiveAccount.classList.remove('active');
    }
    
    element.classList.add('active');
    this.currentActiveAccount = element;
    
    const accountId = element.dataset.id;
    App.showPage('transactions', { account_id: accountId });
  }

  /**
   * Возвращает HTML-код счёта для последующего отображения
   */
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

  /**
   * Получает информацию о счёте и отображает его в боковой колонке
   */
  renderItem(item) {
    const accountsList = this.element.querySelector('.accounts-panel');
    if (accountsList) {
      accountsList.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
    }
  }
}