var host = process.env.MONGODB_PORT_27017_TCP_ADDR || '127.0.0.1';
var port = process.env.MONGODB_PORT_27017_TCP_PORT || '27017';
var url = 'mongodb://'+ host + ':' + port + '/pe';

module.exports = {
  host: host,
  port: port,
  url:url
};