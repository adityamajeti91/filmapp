const CommentCtrl = require('../controllers/comment');

//Registration API
const createComment = async (req, res) => {
    try {
        if (req && req.params && req.params.id && req.user && req.user.userInfo && req.user.userInfo.id) {
            req.body.filmId = req.params.id;
            req.body.userId = req.user.userInfo.id;
            req.body.userName = req.user.userInfo.name;
        }
        const comment = await CommentCtrl.create(req.body);
        if (comment) {
          return res.send(comment);
        }
        return res.status(400).send("Comment registration failed!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    createComment
};
