/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (response) => {
      if (response && response.user) {
        // 1. Сохраняем данные пользователя
        User.setCurrent(response.user);
        
        // 2. Обновляем состояние приложения
        App.setState('user-logged');
        
        // 3. Закрываем окно с формой
        const modal = App.getModal('login');
        if (modal) {
          modal.close();
        }
        
        // 4. Очищаем форму
        this.element.reset();
      } else {
        // Обработка ошибки авторизации
        console.error('Ошибка авторизации:', response ? response.error : 'Неизвестная ошибка');
        
        // Можно добавить отображение ошибки пользователю
        const errorElement = this.element.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = response ? response.error : 'Ошибка сервера';
        this.element.appendChild(errorElement);
      }
    });
  }
}