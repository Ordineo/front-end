Feature('About directive');

Before((I) => {
  I.amOnPage('/#/profile');
});
Scenario('Profile page', (I) => {
  I.see('Jworks 360', '.header-bg');
  I.waitForElement('.btnEdit');
  I.click('.btnEdit');
  I.waitForElement({model: 'about.employee.function'});
  I.fillField({model: 'about.employee.function'},'test');
  // I.fillField('userFunctie','Back-end developer');
});
