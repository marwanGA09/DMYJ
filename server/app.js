const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routers/usersRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', (req, res, next) => {
//   console.log(req);
//   res.end('home');
// });

app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  next(
    new AppError(`There is no route with this ${req.originalUrl} address`, 500)
  );
});
app.use(errorController);

module.exports = app;
