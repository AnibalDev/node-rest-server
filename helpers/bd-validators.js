const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {

    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no está registrado en la BD`)
    }
}

const emailExist = async (email = '') => {
    const result = await User.findOne({ email });
    if (result) {
        throw new Error(`El email ${email} ya está registrado en la BD`)
    }
}
const userIdExist = async (id) => {
    const result = await User.findById(id);
    if (!result) {
        throw new Error(`El id: ${id} no existe en la BD`)
    }
}


module.exports = {
    isValidRole,
    emailExist,
    userIdExist
}