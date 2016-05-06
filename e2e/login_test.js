Feature('Login page');

Before((I) => {
  I.amOnPage('/#/login');
});

Scenario('Login correctly', (I) => {
  I.seeElement('#login-form');
  I.fillField({model: '$ctrl.user.username'},'Nivek');
  I.fillField({model: '$ctrl.user.password'},'password');
  I.click('#login-btn');
  I.dontSeeElement('#login-form');
  I.see('JWorks 360', '#toolbar');
});

Scenario('Login with wrong credentials', (I) => {
  I.fillField({model: '$ctrl.user.username'},'NoUser');
  I.fillField({model: '$ctrl.user.password'},'nopassword');
  I.click('#login-btn');
  I.seeElement('#login-form');
  //I.see('an error', '#login-form'); //todo
  I.dontSee('JWorks 360', '#toolbar');
});

Scenario('Logout', (I) => {
  I.fillField({model: '$ctrl.user.username'},'Nivek');
  I.fillField({model: '$ctrl.user.password'},'password');
  I.click('#login-btn');
  I.click('#user-menu');
  I.click('#logout-btn');
  I.seeElement('#login-form');
});

//todo add for some errors


