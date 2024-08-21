const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usersRouter = require('./routers/usersRouter');
const membersRouter = require('./routers/membersRouter');
const paymentsRouter = require('./routers/paymentsRouter');
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');
const authController = require('./controllers/authController');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.post('/signIn', authController.signIn);

app.use('/users', usersRouter);
app.use('/members', membersRouter);
app.use('/payments', paymentsRouter);

app.use('*', (req, res, next) => {
  next(
    new AppError(`There is no route with this ${req.originalUrl} address`, 500)
  );
});
app.use(errorController);

module.exports = app;
