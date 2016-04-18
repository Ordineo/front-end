Feature('Timeline directive');

Before((I) => {
  I.amOnPage('/#/profile');
});

Scenario('Show the timeline and click on a card', (I) => {
  I.seeElement('milestone-container');
  I.see('Timeline', '#milestone-container');
  I.waitForElement('#timeline', 2);
  I.dontSeeElement('#milestone-container .btnEdit');
  I.seeElement('.fade-text', '#timeline');
  I.dontSee('Personal motivation', '#timeline');
  I.click('.timeline-card', '#timeline');
  I.see('Personal motivation', '#timeline');
});




