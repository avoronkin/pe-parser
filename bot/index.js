var Browser = require('../browser');
var user = require('../config').user;

var Q = require('q');

function Bot(){
  this.browser = new Browser();

}

Bot.prototype.stop = function(){
  this.browser.end();
};

Bot.prototype.openPage = function(url){
  return this.browser.url(url).auth(user);
};

Bot.prototype.getPageHtml = function(options){
  var deferred = Q.defer();

  if(!options.url || !options.selector){
    deferred.reject(new Error('Bot - getPageHtml: Required parameters are not specified'));
  }

  this.openPage(options.url);

  this.browser.getHTML((options.selector),function(error, html){
    if(error){
      deferred.reject(new Error(error));
    }else{
      deferred.resolve(html);
    }
  });

  return deferred.promise;
};


module.exports = Bot;