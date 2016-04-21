Feature('Timeline directive');

Before((I) => {
  I.amOnPage('/#/profile');
});

/*Scenario('Show the timeline and click on a card', (I) => {
  I.seeElement('#milestone-container');
  I.see('Timeline', '#milestone-container');
  I.waitForElement('#timeline', 2);
  I.dontSeeElement('#milestone-container .btnEdit');
  I.seeElement('.fade-text', '#timeline');
  I.dontSee('Personal motivation', '#timeline');
  I.click('.timeline-card', '#timeline');
  I.see('Personal motivation', '#timeline');
});*/

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
  //I.wait(10);
});



