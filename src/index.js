var express = require('express');
var app = express();
const mongoose = require('mongoose');

// ROUTES
let userRoutes = require('./routes/User.routes');
let monsterRoutes = require('./routes/Monster.routes');

const dbAccessString = 'mongodb://localhost:27017/TrophyApp';

mongoose.connect(dbAccessString, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.get('/', (_, res) => {
  res.send({ status: 'Online!' });
});

app.use('/user', userRoutes);
app.use('/monster', monsterRoutes);

app.listen(3000, () => {
  console.log('Server is online.');
});
