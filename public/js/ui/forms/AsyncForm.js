
/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if(!element) {
      throw new Error("Пустой элемент");
    }

    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.element.checkValidity() === true) {
        this.submit();
      }
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    const formData = this.getData()
   this.onSubmit(formData);
  }
}