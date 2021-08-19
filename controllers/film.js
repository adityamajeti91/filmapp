const Film = require('../models/Film');

//Create Film
const create = (data) => {
    try {
        const film = Film.create(data);
        return film;
    } catch (err) {
        throw err;
    }
}

//Get Films
const find = (query) => {
    try {
        const films = Film.find(query);
        return films;
    } catch (err) {
        throw err;
    }
}

//Get Film By Id
const findById = (id) => {
    try {
        const film = Film.findById(id);
        return film;
    } catch (err) {
        throw err;
    }
}

//Update Film By Id
const updateById = (id, data) => {
    try {
        const film = Film.updateOne(
            { _id: id },
            { $set: data },
            { upsert: true }
        );
        return film;        
    } catch (err) {
        throw err;
    }
}

//Delete Film By Id
const deleteById = (id) => {
    try {
        const film = Film.deleteOne({ _id: id });
        return film;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    find,
    findById,
    updateById,
    deleteById
};
