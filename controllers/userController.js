const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc: Register User
//@route POST /api/users/register
//access public
const expressAsyncHandler = require("express-async-handler");
const registerUser = expressAsyncHandler(async (req, res) => {
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const userAvailable = await userModel.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });
    if (user) {
        res.status(201).json({_id: user._id, email: user.email});
    } else {
        res.status(400);
        throw new Error('Error creating user.');
    }
})

//@desc User Login
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (user && bcrypt.compare(password, user.password)) {
        res.status(200).json({
            token: jwt.sign({
                user: {
                    email,
                    id: user._id,
                }
            }, process.env.ACCESS_SECRET, {expiresIn: '15m'})
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
})

//@desc Get Current User Info
//@route GET /api/users/login
//@access public
const currentUser = expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await userModel.findById(req.user.id);
    res.status(200).json({email: user.email, id: user._id, name: user.username});
})

module.exports = {registerUser, loginUser, currentUser};