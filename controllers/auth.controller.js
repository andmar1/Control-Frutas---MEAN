//response para tipado
const { response } = require('express');


const crearUsuario = ( req, res = response ) =>{

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