var context = require.context('./src/test/spec/pages', true, /\.spec\.js$/);
context.keys().forEach(context);
