const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

const DB_URL = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB_URL).then((conn) => {
  console.log('db is connected');
});

const server = app.listen(3090, () => console.log('app is listening on 3090'));
