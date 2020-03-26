const { register } = require('react-cucumber');
// require your components here, for example:
const { Article } = require('../../app/assets/javascripts/components/_article');
// ...

register([
  Article,
  // ... more components here
]);
