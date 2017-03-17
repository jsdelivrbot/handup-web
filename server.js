var express = require('express');
var history = require('connect-history-api-fallback');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 8080;
var publicPath = __dirname;

app.use(history());
app.use(express.static(publicPath));


// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});
