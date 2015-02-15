module.exports = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  host: process.env.SELENIUM_PORT_4444_TCP_ADDR || '127.0.0.1',
  port: process.env.SELENIUM_PORT_4444_TCP_PORT || '4444'
};