const AuthCtrl = require('../controllers/auth');

//Registration API
const registration = async (req, res) => {
    try {
        const user = await AuthCtrl.registration(req.body);
        if (user) {
          return res.send(user);            
        }
        return res.status(400).send("User registration failed!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

//Login API
const login = async (req, res) => {
    try {
        const userAccess = await AuthCtrl.login(req.body);
        if (userAccess) {
            return res.send(userAccess);
        }
        return res.status(404).send("User login failed!!");
    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports = {
    registration,
    login
};
