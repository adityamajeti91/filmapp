const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Registration
const registration = async (data) => {
    //Check user already exists in db
    const isEmailExists = await User.findOne({
        email: data.email
    });
    if (isEmailExists) throw ({ statusCode: 400,  msg: 'User already exists' })

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = new User({
        name: data.name,
        email: data.email,
        password: hashedPassword
    });
    
    try {
        const usr = await user.save();
        return {
            _id: usr._id,
            name: usr.name,
            email: usr.email,
            createdDate: usr.createdDate
        };
    } catch (error) {
        throw error;
    }
}

//Login
const login = async (data) => {
    //Check email exists in db
    if (!data.email) throw ({ statusCode: 422,  msg: 'Invalid input, email is mandatory' })
    const user = await User.findOne({
        email: data.email
    });
    if (!user) throw ({ statusCode: 400,  msg: 'User not found' })

    if (data.grant_type === 'password') {
        //Validate password
        const validPass = await bcrypt.compare(data.password, user.password);
        if (!validPass) throw ({ statusCode: 400,  msg: 'Invalid password' })

        const userInfo = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        //create access_token & refresh_token
        const access_token = jwt.sign({userInfo}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*60 });
        const refresh_token = jwt.sign({userInfo}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 60*60*6 });     
        return ({
            access_token,
            refresh_token
        });
    }
    if (data.grant_type === 'refresh_token') {
        //Validate refresh_token
        if (!data.refresh_token) return res.status(400).send('Invalid input, refresh_token is mandatory');

        const user = jwt.verify(data.refresh_token, process.env.REFRESH_TOKEN_SECRET);
        if (user) {
            //create access_token by refresh_token
            const access_token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*60 });
            const refresh_token = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 60*60*6 });
            return ({
                access_token,
                refresh_token
            });
        }
    }
}

module.exports = {
    registration,
    login
};