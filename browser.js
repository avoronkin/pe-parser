var wd = require('webdriverio');
var wdOptions = require('./config').webdriverio;
var loginPage = require('./config/pages/login.js');
var topmenu = require('./config/pages/topmenu.js');

function Browser() {
  var client = wd.remote(wdOptions).init();

  client.addCommand('login', function(user, cb) {
    client.url(loginPage.url)
      .setValue(loginPage.el.loginInput, user.login)
      .setValue(loginPage.el.passwordInput, user.password)
      .submitForm(loginPage.el.loginForm)
      .pause(1500, cb);
  });


  client.addCommand('auth', function(user, cb) {
    client.url(function(err, responce) {
      var url = (responce && responce.value) ? responce.value : null;

      client.element(topmenu.el.logoutLink, function(err, element) {
        if (!err) {
          cb();
        } else {
          client.login(user).url(url, cb);
        }
      });
    });
  });

  return client;
}


module.exports = Browser;