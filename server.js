var express = require('express');
var history = require('connect-history-api-fallback');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 8080;
var publicPath = __dirname;

// We point to our static assets
app.use(express.static(publicPath));
app.use(history());

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
