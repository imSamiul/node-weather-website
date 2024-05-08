const { prebuild } = require('prebuilt');

prebuild({
  entry: './templates/views/index.hbs', // Your main Handlebars template
  context: {
    // Data to pass to the template
    title: 'My Website',
    content: 'This content is pre-rendered',
  },
  output: './public/index.html', // Output location for the pre-rendered HTML
});
