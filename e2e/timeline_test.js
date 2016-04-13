Feature('Timeline directive');

Before((I) => {
  I.amOnPage('/#/profile');
});

Scenario('Show the timeline and click on a card', (I) => {
  I.seeElement('timeline');
  I.waitForElement('#timeline', 2);
  I.see('Timeline', '#timeline');
  I.dontSeeElement('#timeline .btnEdit');
  I.seeElement('.fade-text', '#timeline');
  I.dontSee('Personal motivation', '#timeline');
  I.click('.timeline-card', '#timeline');
  I.see('Personal motivation', '#timeline');
});




