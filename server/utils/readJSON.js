const fs = require('fs');
const MembersModel = require('../models/memberModel');
const mongoose = require('mongoose');

const PASSWORD = `....................`;
const DATABASE_URL = `....................`;

const DB_URL = DATABASE_URL.replace('<PASSWORD>', PASSWORD);

mongoose.connect(DB_URL).then((conn) => {
  console.log('connected');
});

function readFile(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

const listOfMembers = readFile('./../json/members.json');
console.log(listOfMembers.length);

async function saveToDb(members) {
  try {
    console.log('members**', members);
    const mem = await MembersModel.insertMany(members);
    console.log('mem', mem);
  } catch (err) {
    console.log('Error', err);
  }
}

saveToDb(listOfMembers);
