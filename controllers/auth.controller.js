//response para tipado
const { response } = require('express');

const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')  //para hash de password
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async ( req, res = response ) =>{

    // Creacion del usuario 
    const { email, name, password } = req.body;   //destructuring
    // console.log( email, name, password )

    // validar correos iguales 
    try {
        //verificar que no existan correos iguales (verificar email)
        const usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:"El usuario con ese email ya existe"
            });
        }
        // creacion del usuario con el modelo 
        const dbUser = new Usuario( req.body )

        //Hashear de la contraseña para seguridad
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generar el JWT, autenticacion 
        const token = await generarJWT( dbUser.id, name )

        // Crear usuario en DB 
        await dbUser.save();

        // Generar la respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid:dbUser.id,
            name, 
            email,
            token
        })
        

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }

}


const loginUsuario = async( req, res=response ) =>{

    const { email, password } = req.body;   //desestructurados
    // console.log(email, password)

    try {
        const dbUser = await Usuario.findOne({ email:email })

        if (!dbUser) {   //Si no tenemos user
            return res.status(400).json({
                ok:false,
                msg:'El correo no existe'
            });
        }

        // confirmar si el password hace match 
        const validarPassword = bcrypt.compareSync( password, dbUser.password );
    
        if ( !validarPassword ) {
            return res.status(400).json({
                ok:false,
                msg:'El password no es valido'
            });
        }
        // Paso validaciones, tenemos un usuario valido 
        const token = await generarJWT( dbUser.id, dbUser.name )

        //Respuesta del servicio
        return res.json({
            ok:true,
            uid:dbUser.id,
            name:dbUser.name,
            email:dbUser.email,
            token
        })

    } catch (error) {
        console.log( error )
        
        return res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }
}

const revalidarToken = async( req, res = response ) =>{
     
    const { uid } = req;

    //Leer la base de datos para obtener el email por id
    const dbUser = await Usuario.findById(uid);

    //Generar el JSON WEB token, autenticacion 
    const token = await generarJWT(uid, dbUser.name )

    return res.json({
        ok:true,
        uid, 
        name:dbUser.name,
        email:dbUser.email,  //
        token
    });
    
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
 }