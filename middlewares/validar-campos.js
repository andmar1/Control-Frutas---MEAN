const { response } = require("express");  //solo para tipado
const { validationResult } = require("express-validator");

const validarCampos = (( req, res= response, next )=>{

    const errors = validationResult( req );

    if (!errors.isEmpty()) {             //validar error 
        return res.status(400).json({   //respuesta de status (400)
            ok:false,                   //response false
            msg:errors.mapped()         //ver errores mostrados
        })
    }

    next();  //si no hay errores se ejecuta el next para poder enviar la peticion
})

module.exports = {
    validarCampos
}