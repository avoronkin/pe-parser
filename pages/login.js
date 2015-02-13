var config = require('../config');

module.exports = {
  url: config.peHost + '/user/auth/login/',
  el: {
    loginInput: '#Login',
    passwordInput: '#Password',
    formError: '.error-message',
    loginForm: '#loginForm2',
  }
};