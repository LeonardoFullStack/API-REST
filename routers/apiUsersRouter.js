const express=require('express');
const router=express.Router();
const {crearUsuario, renew, loginUser} = require('../controllers/userController')
const {validarInputs}=require('../middleware/validarInputs')
const {check} =require('express-validator')
const {validarJwt} = require('../middleware/validarJwt')



router.post('/',[
    check('email', 'el email no es válido').not().isEmpty().isEmail(),
    check('pass', 'La contraseña tiene que tener mínimo 4 caracteres').isLength({min:4}),
    validarInputs
], loginUser);


router.post('/new', [
    check('nombre', 'Hay que insertar un nombre').not().isEmpty(),
    check('email', 'el email no es válido').not().isEmpty().isEmail().normalizeEmail(),
    check('pass', 'La contraseña tiene que tener mínimo 4 caracteres').isLength({min:4}),
    validarInputs
], crearUsuario)

router.get('/renew', validarJwt, renew)

module.exports=router