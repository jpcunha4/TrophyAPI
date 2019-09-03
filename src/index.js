var express = require('express');
var app = express();

app.get('/', (_, res) => {
  res.send('Welcome to the trophy app!');
});

app.listen(3000, () => {
  console.log('Server is online.');
});
