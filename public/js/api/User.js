const { response } = require("express");

/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = '/user'; //ссылка - класс в юзере
  
  static setCurrent(user) {
    localStorage.setItem ('user', JSON.stringify (user)); // делвем ник нейм в формате джейсон строки 
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem ('user'); // в момент разлогинивания. 
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const userJson = localStorage.getItem ('user');
    return userJson ? JSON.parse (userJson) : null; // проверка возврата данных
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest ({
      url: this.URL + '/current',
      method: 'GET',
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent (response.user);
        }
        callback (err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
      createRequest ({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent (response.user);
        }
        callback (err, response);
      }
    });   
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
      createRequest ({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        this.unsetCurrent ();
        callback (err, response);
      }
    });   
  }
}