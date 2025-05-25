/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector ('.sidebar-toggle.visible-xs');
    if (toggleButton) {
      toggleButton.addEventListener ('click', (event) => {
        event.preventDefault ();
        const body = document.body;
        const isCollapsed = body.classList.contains ('sidebar-collapse');
        if (isCollapsed) {
          body.classList.remove('sidebar-collapse', 'sidebar-open');
        } else {
          body.classList.add('sidebar-collapse', 'sidebar-open');
        }
      });
    }
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginBtn = this.element.querySelector('.menu-item_login');
    loginBtn.addEventListener('click', () => App.getModal('login').open());
  }
}