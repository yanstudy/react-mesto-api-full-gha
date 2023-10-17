export const SAULT_ROUNDS = 10;

// переменные окружения
export const { JWT_SECRET = 'JWT', NODE_ENV, PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// Список доступных урлов
export const allowedCors = [
    'https://yanstudy.nomoredomainsrocks.ru',
    'http://yanstudy.nomoredomainsrocks.ru',
    'https://praktikum.tk',
    'http://praktikum.tk',
  ];