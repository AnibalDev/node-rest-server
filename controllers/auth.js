const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJWT } = require('../helpers/create-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        console.log(email);
        // Validate if email exist
        const user = await User.findOne({email});
        console.log(user);
        if(!user) {
            return res.status(400).json({
                msg: 'The email or password aren\'t correct',
            });
        }
        // Validate if user status
        if(!user.state) {
            return res.status(400).json({
                msg: 'User status is false',
            });
        }
        //validate if password match
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword) {
            return res.status(400).json({
                msg: 'The email or password aren\'t correct',
            })
        }
        //generate JWT
        const token = await createJWT(user.id); 

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;
    res.json({
        msg: 'Todo bien',
        id_token
    })
}

module.exports = {
    login,
    googleSignIn
}