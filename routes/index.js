const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');

const {
    createFilm,
    getFilms,
    getFilmById,
    updateFilmById,
    deleteFilmById
} = require('./film');

const {
    createComment
} = require('./comment');

const {
    registration,
    login
} = require('./auth');

const {
    registerValidation,
    loginValidation,
    filmCreationValidation,
    filmUpdateValidation
} = require('../middleware/validation');

//User Registration
router.post('/user/register', registerValidation, registration);

//User Login
router.post('/user/login', loginValidation, login);

router.use(verifyToken);

//Create Film
router.post('/films/', filmCreationValidation, createFilm);

//Get Films
router.get('/films/', getFilms);

//Get Film By Id
router.get('/films/:id', getFilmById);

//Update Film By Id
router.put('/films/:id', filmUpdateValidation, updateFilmById);

//Delete Film By Id
router.delete('/films/:id', deleteFilmById);

//Create Comment
router.post('/films/:id/comment', createComment);

module.exports = router;