const FilmCtrl = require('../controllers/film');

//Create Film/s
const createFilm = async (req, res) => {
    try {
        let film = await FilmCtrl.find({
            name: req.body.name
        });
        if (film && film.length > 0) {
            return res.status(400).send("Film with same name already exists!");
        }
        film = await FilmCtrl.create(req.body);
        if (film) {
          return res.send(film);            
        }
        return res.status(400).send("Film creation failed!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

//Get Films
const getFilms = async (req, res) => {
    try {
        const films = await FilmCtrl.find({});
        if (films) {
            return res.send(films);
        }
        return res.status(404).send("Films not found!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

//Get Film By Id
const getFilmById = async (req, res) => {
    try {
        const film = await FilmCtrl.findById(req.params.id);
        if (film) {
            return res.send(film);
        }
        return res.status(404).send("Film not found!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

//Update Film By Id
const updateFilmById = async (req, res) => {
    try {
        const film = await FilmCtrl.updateById(req.params.id, req.body);
        if (film) {
            return res.send(film);
        }
        return res.status(400).send("Film update failed!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

//Delete Film By Id
const deleteFilmById = async (req, res) => {
    try {
        const film = await FilmCtrl.deleteById(req.params.id);
        if (film) {
            return res.send(film);
        }
        return res.status(400).send("Film deletion failed!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    createFilm,
    getFilms,
    getFilmById,
    updateFilmById,
    deleteFilmById
};
