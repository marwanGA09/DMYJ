const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res, next) => {
  console.log(req);
  res.end('here is working app');
});

module.exports = app;
