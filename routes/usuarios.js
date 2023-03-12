const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { isValidRole, emailExist, userIdExist } = require('../helpers/bd-validators');
const { isAdminRole, validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
    check('id', 'El ID no es valido').isMongoId().bail().custom(userIdExist),
    check('role').custom(isValidRole),
    validateFields
], usuariosPut);
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas 6 letras').isLength({ min: 6 }),
    check('email', 'Email don\'t valid').isEmail(),
    check('role').custom(isValidRole),
    check('email').custom(emailExist),
    validateFields
], usuariosPost);
router.patch('/', usuariosPatch);
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'El ID no es valido').isMongoId().bail().custom(userIdExist),
    validateFields,
], usuariosDelete);

module.exports = router;