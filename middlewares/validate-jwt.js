const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usesr = require('../models/user');

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