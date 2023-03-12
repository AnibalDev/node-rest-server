const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const { uid } = jwt.verify(token,process.env.SECRETKEY);
        const user = await User.findById(uid);
        if(!user) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            })
        }
        // Verify is user state is true
        if(!user.state) {
            return res.status(401).json({
                msg: 'Token no valido'
            })
        }
        req.user = user;
        next();
    } catch {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}
module.exports = {
    validateJWT
}