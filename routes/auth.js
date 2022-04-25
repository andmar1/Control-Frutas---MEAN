const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Rutas de peticiones 

// Crear un nuevo usuario
router.post( '/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min:6 }),
    ], crearUsuario);

// Login de usuario
router.post( '/', loginUsuario );

// Validar y revalidar token
router.get( '/renew', revalidarToken);


module.exports = router;