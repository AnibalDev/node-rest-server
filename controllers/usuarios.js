const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usuariosGet = async (req, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    res.json({
        total,
        users,
    });
}
const usuariosPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});
    // Encript password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
    //Save DB
    await user.save();
    res.json(user);
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, google,email,... left } = req.body;
    if(password) {
       // Encript password
        const salt = bcryptjs.genSaltSync(10);
        left.password = bcryptjs.hashSync(password, salt); 
    }
    const user = await User.findByIdAndUpdate(id, left);
    res.json(user);
} 
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}
const usuariosDelete= async (req, res = response) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    const userWithToken = req.user;
    res.json({
        user,
        userWithToken
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}