//response para tipado
const { response } = require('express');

const { validationResult } = require('express-validator')

const crearUsuario = ( req, res = response ) =>{

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            msg:errors.mapped()
        });
    }
    
    // Creacion del usuario 
    const { email, name, password } = req.body;   //destructuring
    console.log( email, name, password )

    return res.json({
        ok:true,
        msg:'Crear usuario / new'
    });
}


const loginUsuario = ( req, res=response ) =>{

    const errors = validationResult( req );

    if (!errors.isEmpty()) {             //validar error 
        return res.status(400).json({   //respuesta de status (400)
            ok:false,                   //response false
            msg:errors.mapped()         //ver errores mostrados
        })
    }

    return res.json({
        ok:true, 
        mgs:'Login de usuario /'
    })

    const { email, password } = req.body;   //desestructurados
    console.log(email, password)
}

const revalidarToken = ( req, res = response ) =>{
    return res.json({
        ok:true,
        msg:'Renew'
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
 }