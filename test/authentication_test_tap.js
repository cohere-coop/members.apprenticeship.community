const tap = require('tap')
const Browser = require('zombie')

function logIn(credentials, browser) {
  return browser.visit('/').then(function() {
    return browser.clickLink("Log in")
  }).then(function() {
    browser.fill('email', credentials.email)
           .fill('password', credentials.password);

    return browser.pressButton("Log in");
  })
}

tap.test("Logging in", function(t) {
  const browser = new Browser({ site: 'http://localhost:3000' });
  logIn({ email: "test@example.com", password: "password"}, browser).then(function() {
    browser.assert.text('.dashboard', "Welcome test@example.com")
    browser.assert.success();
    t.end();
  });
});
