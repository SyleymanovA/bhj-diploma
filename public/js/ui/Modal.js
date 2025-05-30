class Modal {
  constructor(element) {
    if (!element) throw new Error('Элемент не передан');
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    // Обработчик для всех элементов закрытия
    this.element.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });
  }

  open() {
    this.element.style.display = 'block';
    this.element.classList.add('fade', 'in');
    // Добавляем класс для body чтобы заблокировать прокрутку
    document.body.classList.add('modal-open');
  }

  close() {
    this.element.style.display = 'none';
    this.element.classList.remove('fade', 'in');
    document.body.classList.remove('modal-open');
  }
}