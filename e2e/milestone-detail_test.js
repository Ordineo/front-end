Feature('Milestone details on Milestone page');

Before((I) => {
  I.amOnPage('/#/login');
  I.fillField({model: '$ctrl.user.username'}, 'Test');
  I.fillField({model: '$ctrl.user.password'}, 'password');
  I.click('#login-btn');
  I.click('//span[text()="Milestones"]', '#main-menu');
});

Scenario('Show the details of a milestone', (I) => {
  I.see('Please select a milestone', '#milestone-details');
  I.see('Spring Boot', '#milestone-list');
  I.click('//span[text()="Spring Boot "]', '#milestone-list');
  I.see('Spring Boot', '#milestone-details');
});

Scenario('Edit the details of a milestone', (I) => {
  I.click('//span[text()="Spring Boot "]', '#milestone-list');
  I.see('Spring Boot', '#milestone-details');
  I.click('.btnEdit', '#milestone-details');
  I.seeElement('#edit-milestone');
  I.fillField({model: '$ctrl.milestone.moreInformation'},'More information test');
  I.click('.btnOk', '#edit-milestone');
  I.see('More information test', '#milestone-details');
});



