'use strict';

const path = require('path');
const wd = require('wd');

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.promiseChainRemote({
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
  });

  before(function() {
    return driver.init({
      platformName: 'ios',
      platformVersion: '9.3',
      deviceName: 'iPhone 5s',
      autoAcceptAlerts: true,
      app: path.join(__dirname, '..', 'app', 'ios-app-bootstrap.zip')
    });
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#1 should login success', function() {
    return driver
      .waitForElementByName('Login')
      .click()
      .sleep(5000);
  });

});
