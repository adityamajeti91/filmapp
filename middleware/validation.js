const Joi = require('@hapi/joi');

const filmCreationValidation = (req, res, next) => {
    try {
        if (!Object.keys(req.body).length) return res.status(422).send("Input required");

        let schema = '';
        const filmCreationObject = {
            name: Joi.string().trim().min(1).max(30).required(),
            description: Joi.string().trim().min(3).max(180).required(),
            realeaseDate: Joi.date().required(),
            rating: Joi.number().min(1).max(5).required(),
            ticketPrice: Joi.number().required(),
            country: Joi.string().required(),
            genre: Joi.array().items(Joi.string()),
            photo: Joi.string().required()
        };

        if (Array.isArray(req.body)) {
            schema = Joi.array().items(filmCreationObject);
        } else {
            schema = Joi.object(filmCreationObject);
        }
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);

        next();
    } catch (error) {
        throw error;
    }
}

const filmUpdateValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            _id: Joi.string().required(),
            name: Joi.string().trim().min(1).max(30).required(),
            description: Joi.string().trim().min(3).max(180).required(),
            realeaseDate: Joi.date().required(),
            rating: Joi.number().min(1).max(5).required(),
            ticketPrice: Joi.number().required(),
            country: Joi.string().required(),
            genre: Joi.array().items(Joi.string()),
            photo: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);
         
        next();
    } catch (error) {
        throw error;
    }
}

const registerValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);
        
        next();
    } catch (error) {
        throw error;
    }
}

const loginValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required(),
            grant_type:  Joi.string().min(8).required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(422).send(error.details[0].message);
        
        next();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    filmCreationValidation,
    filmUpdateValidation
}