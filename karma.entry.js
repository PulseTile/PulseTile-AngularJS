var context = require.context('./src/app/', true, /\.spec\.js$/);
context.keys().forEach(context);
