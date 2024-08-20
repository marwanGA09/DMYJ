const fs = require('fs');
const mongoose = require('mongoose');
const UserModel = require('./../models/UserModel');
const csv = require('csv-parser');
const readCSV = async () => {};

const DATABASE_PASSWORD = '.......................';
const DATABASE_URL = '.......................';
const DB_URL = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose.connect(DB_URL).then((conn) => {
  console.log('connected');
});

fs.createReadStream(`./../csv/users.csv`)
  .pipe(csv())
  .on('data', async (data) => {
    try {
      console.log('data', data);
      const users = await UserModel.create(data);
      console.log('users', users);
    } catch (err) {
      console.log('Error', err);
    }
  })
  .on('end', () => {
    console.log('CSV file processed successfully');
  });
