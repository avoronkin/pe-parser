module.exports = {
  host: process.env.MONGODB_PORT_27017_TCP_ADDR || '127.0.0.1',
  port: process.env.MONGODB_PORT_27017_TCP_PORT || '27017'
};