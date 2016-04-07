Feature('About directive');

var pageTitle = 'JWorks 360';

Before((I) => {
  I.amOnPage('/#/profile');
});

Scenario('Open the profile page', (I) => {
  I.see(pageTitle, '.header-bg');
  I.see('Sync with Linkedin', '#getDetails');
  I.waitForElement('.about-header', 2);
  I.seeElement('.about-header');
  //I.seeNumberOfElements('.about-header', 1);
  I.seeElement('.btnEdit');
  I.dontSeeElement('.btnSave');
  I.dontSeeElement('.edit-info');
  I.see('MORE', '.about-footer');
  I.dontSee('COLLAPSE', '.about-footer');
  I.click('.btnMore');
  I.dontSee('MORE', '.about-footer');
  I.see('COLLAPSE', '.about-footer');
});

Scenario('Edit the about section and cancel', (I) => {
  I.waitForElement('.btnEdit', 2);
  I.click('.btnEdit');
  I.waitForElement({model: 'about.employee.function'});
  I.fillField({model: 'about.employee.function'},'wrong function');
  I.click('.btnCancel');
  I.dontSee( 'wrong function', '.about-function');
});
