const SAULT_ROUNDS = 10;

// переменные окружения
const { JWT_SECRET = 'JWT', NODE_ENV, PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// Список доступных урлов
const allowedCors = [
    'https://yanstudy.nomoredomainsrocks.ru',
    'http://yanstudy.nomoredomainsrocks.ru',
    'https://praktikum.tk',
    'http://praktikum.tk',
  ];
module.exports = {
    SAULT_ROUNDS,
    JWT_SECRET,
    NODE_ENV,
    PORT,
    DB_URL,
    allowedCors,
}