var express = require('express');
var app = express();
const mongoose = require('mongoose');

let userRoutes = require('./routes/User.routes');

const dbAccessString = 'mongodb://localhost:27017/TrophyApp';

mongoose.connect(dbAccessString, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.get('/', (_, res) => {
  res.send({ status: 'Online!' });
});

app.use('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is online.');
});
