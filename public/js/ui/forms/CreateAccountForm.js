/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create (data, (response) => {
      if (response && response.success) {
        this.element.reset ();
        const modal = App.getModal ('createAccount');
        if (modal) {
          modal.close ();
        }
        App.update ();
      } else {
        console.error ('Ошибка создания:', response.error);
      }
    });
  }
}