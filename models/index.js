const Role = require('../models/role');
const User = require('../models/user');

module.exports = {
    ...Role,
    ...User
}
