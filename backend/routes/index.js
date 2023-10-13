const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-err');

router.use(usersRouter);
router.use(cardsRouter);
router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
