const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routers/usersRouter');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', (req, res, next) => {
//   console.log(req);
//   res.end('home');
// });

app.use('/users', userRouter);

module.exports = app;
