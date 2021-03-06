Feature('Timeline section in summary');

Before((I) => {
  I.amOnPage('/#/login');
  I.fillField({model: '$ctrl.user.username'}, 'Test');
  I.fillField({model: '$ctrl.user.password'}, 'password');
  I.click('#login-btn');
});

// todo fix test, works local  but not remote
// Scenario('Show the timeline and click on a card', (I) => {
//   I.seeElement('#milestone-container');
//   I.see('Timeline', '#milestone-container');
//   I.waitForElement('#timeline', 2);
//   I.dontSeeElement('#milestone-container .btnEdit');
//   I.seeElement('.fade-text', '#timeline');
//   I.dontSee('Personal motivation', '#timeline');
//   I.click('.timeline-card', '#timeline');
//   I.see('Personal motivation', '#timeline');
// });

Scenario('Show the timeline and create a milestone', (I) => {
  I.waitForElement('#milestone-container');
  I.dontSeeElement('.btnSave', '#milestone-container');
  I.dontSeeElement('.btnCancel', '#milestone-container');
  I.click('.btnCreate', '#milestone-container');
  I.see('Create milestone', '#milestone-container');
  I.seeElement('.btnSave', '#milestone-container');
  I.seeElement('.btnCancel', '#milestone-container');
  I.see('Objective', '#milestone-container');
  I.see('Due Date', '#milestone-container');
  I.see('More Information', '#milestone-container');
  I.dontSee('You must select an objective', '#milestone-container');
  I.fillField('autocompleteField', 'Wrong milestone');
  I.click('.btnSave', '#milestone-container');
  I.see('Please select a correct objective', '#milestone-container');
  I.fillField('autocompleteField', '');
  I.see('You must select an objective', '#milestone-container');
  I.click('.btnCancel', '#milestone-container');
  I.see('Timeline', '#milestone-container');
});

Scenario('Go to the detail page of a milestone', (I) => {
  I.waitForElement('#milestone-container');
  I.click('.btnDetail', '#milestone-container');
  I.see('Spring Boot', '#milestone-details');
});



