const Comment = require('../models/Comment');

//Create Comment
const create = (data) => {
    try {
        const comment = Comment.create(data);
        return comment;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create
};
