//response para tipado
const { response } = require('express');

const Usuario = require('../models/Usuario')


const crearUsuario = ( req, res = response ) =>{

    // Creacion del usuario 
    const { email, name, password } = req.body;   //destructuring
    console.log( email, name, password )

    return res.json({
        ok:true,
        msg:'Crear usuario / new'
    });
}


const loginUsuario = ( req, res=response ) =>{

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