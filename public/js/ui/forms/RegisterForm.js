/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
 onSubmit(data) {
    User.register(data, (response) => {
      if (response && response.user) {
        // Сохраняем пользователя
        User.setCurrent(response.user);
        
        // Устанавливаем состояние приложения
        App.setState('user-logged');
        
        // Закрываем окно с формой
        const modal = App.getModal('register');
        if (modal) {
          modal.close();
        }
        
        // Очищаем форму
        this.element.reset();
      } else {
        // Обработка ошибки регистрации
        console.error('Ошибка регистрации:', response.error);
      }
    });
  }
}
