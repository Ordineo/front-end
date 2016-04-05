Feature('About directive');

Before((I) => {
  I.amOnPage('/#/profile');
});
Scenario('Profile page', (I) => {
  I.see('ORDINEO');
});
