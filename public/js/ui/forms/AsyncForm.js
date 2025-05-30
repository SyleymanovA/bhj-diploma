class AsyncForm {
  constructor(element) {
    if (!element) throw new Error('Element not provided');
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options) {
    throw new Error('Method onSubmit must be implemented');
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}