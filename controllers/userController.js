const User = require('../models/user');
const {auth} = require('../config/firebaseConfig');

const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userRecord = await auth.createUser({
            email: email,
            password: password,
        });
        res.status(201).send({message: 'User registered successfully', user: userRecord});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Server error'});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userRecord = await auth.signInWithEmailAndPassword(email, password);
        res.status(200).send({message: 'User logged in successfully', user: userRecord});
    } catch (error) {
        console.error(error);
        res.status(401).send({message: 'Invalid credentials'});
    }
};

module.exports = {registerUser, loginUser};
