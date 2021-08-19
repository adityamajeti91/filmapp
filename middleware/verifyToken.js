// async function verify(req, res, next) {
//     try {
//         const authHeader = req.header('authorization'); 
//         if (authHeader == null || authHeader != '123456789') return res.status(401).send('Access Denied!');
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid Token');
//         next(error);
//     }
// }

// module.exports = exports = verify

const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
    const authorization = req.header('authorization');
    if (authorization == null) return res.status(401).send('Access Denied');

    try {
        const user = jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET);
        if (!user) return res.status(403).send('FORBIDDEN');
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send('Invalid authorization');        
    }
}

module.exports = exports = verify
