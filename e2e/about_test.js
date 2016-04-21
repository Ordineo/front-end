Feature('About directive');

var pageTitle = 'JWorks 360';

Before((I) => {
  I.amOnPage('/#/profile');
});

Scenario('Open the profile page', (I) => {
  //I.see(pageTitle, '.header-bg');
  I.see('Sync with Linkedin', '#getDetails');
  I.waitForElement('.about-header', 2);
  I.seeElement('.about-header');
  //I.seeNumberOfElements('.about-header', 1);
  I.seeElement('.btnEdit');
  I.dontSeeElement('.btnSave');
  I.dontSeeElement('.edit-info');
  I.waitForElement('.about-footer');
  I.seeElement('.about-footer');
  I.see('MORE', '.about-footer');
  I.dontSee('COLLAPSE', '.about-footer');
  I.click('.btnMore');
  I.dontSee('MORE', '.about-footer');
  I.see('COLLAPSE', '.about-footer');
});


Scenario('Edit about section and cancel', (I) => {
  I.waitForElement('.about-header', 2);
  I.click('.btnEdit', '.about-header');
  I.waitForElement({model: 'about.employee.function'}, 2);
  I.fillField({model: 'about.employee.function'},'wrong function');
  I.click('.btnCancel', '.about-header');
  I.dontSee( 'wrong function', '.about-function');
});

Scenario('Edit about section and save changes', (I) => {
  I.waitForElement('.about-header');
  I.click('.btnEdit', '.about-header');
  I.waitForElement({model: 'about.employee.function'});
  I.fillField({model: 'about.employee.function'},'test function');
  I.fillField({model: 'about.employee.description'},'test description');
  I.fillField({model: 'about.employee.unit.name'},'test unit');
  I.click('.btnSave', '.about-header');
  I.waitForElement('.about-header', 2);
  I.see( 'test function', '.about-function');
  I.see( 'test unit', '.about-unit');
  I.see( 'test description', '.about-description');
});




