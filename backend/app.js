require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const appRouter = require('./routes/index');
const { login, logout, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { checkSigninInfo, checkSignupInfo } = require('./middlewares/validation');

const { PORT, DB_URL } = process.env;

// База данных
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to db'));

const app = express();
app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов

// Незащищённые роуты
app.post('/signin', checkSigninInfo, login);
app.post('/signup', checkSignupInfo, createUser);
app.post('/signout', logout);

app.use(cookieParser());

// Авторизация
app.use(auth);

app.use(appRouter);

app.use(errorLogger);

app.use(errors());

// Центральный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
