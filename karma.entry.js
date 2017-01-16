var context = require.context('./src/test/spec/pages/allergies', true, /\.spec\.js$/);
context.keys().forEach(context);
