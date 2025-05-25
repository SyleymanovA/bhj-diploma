/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Element not provided');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    const accountId = this.element.dataset.accountId;
    if (accountId) {
      Account.get(accountId, (response) => {
        if (response && response.success) {
          this.renderAccountData(response.data);
        }
      });
      
      Transaction.list({account_id: accountId}, (response) => {
        if (response && response.success) {
          this.renderTransactions(response.data);
        }
      });
    }
  }
  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      if (e.target.closest('.remove-account')) {
        this.removeAccount(e);
      }
      if (e.target.closest('.remove-transaction')) {
        this.removeTransaction(e);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }

    const accountId = this.element.dataset.accountId;
    Account.remove({ id: accountId }, (err, response) => {
      if (response && response.success) {
        this.clear();
        App.updateWidgets();
      }
    });
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
 removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) {
      return;
    }

    Transaction.remove({ id }, (err, response) => {
      if (response && response.success) {
        this.update();
      }
    });
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
  if (!options || !options.account_id) {
    console.error('Не указан account_id');
    return;
  }

  this.element.dataset.accountId = options.account_id;

  Account.get(options.account_id, (err, accountResponse) => {
    if (err) {
      console.error('Ошибка загрузки счёта:', err);
      return;
    }

    if (accountResponse && accountResponse.success) {
      this.renderTitle(accountResponse.data.name);
    } else {
      console.error('Не удалось загрузить данные счёта');
    }
  });

  Transaction.list({ account_id: options.account_id }, (err, transactionsResponse) => {
    if (err) {
      console.error('Ошибка загрузки транзакций:', err);
      return;
    }

    if (transactionsResponse && transactionsResponse.success) {
    this.renderTransactions(transactionsResponse.data);
    } else {
      console.error('Не удалось загрузить транзакции');
      this.renderTransactions([]); // Показываем пустой список
    }
  });
}

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
 clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    delete this.element.dataset.accountId;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    if (titleElement) {
      titleElement.textContent = name;
    }
  }
  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('ru-RU', options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
 getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row" data-id="${item.id}">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name || 'Без названия'}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger btn-sm remove-transaction">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
renderTransactions(data) {
    const container = this.element.querySelector('.content');
    if (container) {
      container.innerHTML = data.length 
        ? data.map(item => this.getTransactionHTML(item)).join('')
        : '<div class="transaction">Нет транзакций</div>';
    }
  }
}