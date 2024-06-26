const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if(!req.user) {
        return res.status(500).json({
            msg: 'Intento de validar rol sin validar token'
        })
    }
    const { role, name } =  req.user;
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no es administrador`,
        })
    }

    next()
}
module.exports = {
    isAdminRole
}