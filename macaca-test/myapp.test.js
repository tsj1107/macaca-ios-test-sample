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
      .waitForElementByXPath('//UIATextField[1]')
      .sendKeys('loginName')
      .waitForElementByXPath('//UIASecureTextField[1]')
      .sendKeys('123456')
      .sleep(1000)
      .sendKeys('\n')
      .waitForElementByName('Login')
      .click()
      .sleep(5000);
  });

  it('#2 should display home', function() {
    return driver
      .takeScreenshot();
  });

  it('#3 should display webview', function() {
    return driver
      .elementByName('Webview')
      .click()
      .sleep(3000)
      .takeScreenshot();
  });

  it('#4 should go into webview', function() {
    return driver
      .contexts()
      .then(arr => {
        return driver
          .context(arr[arr.length - 1]);
      })
      .elementById('pushView')
      .tap()
      .sleep(5000)
      .contexts()
      .then(arr => {
        return driver
          .context(arr[arr.length - 1]);
      })
      .elementById('popView')
      .tap()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#5 should go into test', function() {
    return driver
      .contexts()
      .then(arr => {
        return driver
          .context(arr[0]);
      })
      .elementByName('Baidu')
      .click()
      .sleep(5000)
      .takeScreenshot();
  });

  it('#6 should works with web', function() {
    return driver
      .contexts()
      .then(arr => {
        return driver
          .context(arr[arr.length - 1]);
      })
      .elementById('index-kw')
      .sendKeys('TesterHome')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('TesterHome');
      })
      .takeScreenshot();
  });

  it('#7 should logout success', function() {
    return driver
      .contexts()
      .then(arr => {
        return driver
          .context(arr[0]);
      })
      .elementByName('PERSONAL')
      .click()
      .sleep(1000)
      .takeScreenshot()
      .elementByName('Logout')
      .click()
      .sleep(1000)
      .takeScreenshot();
  });

});
