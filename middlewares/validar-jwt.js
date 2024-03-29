const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next ) =>{

    const token = req.header('x-token');    //header personalizado   x-token

    if ( !token ) {    //si no tiene x-token agregado lo saca
        return res.status(401).json({
            ok:false,
            msg:'error en el token'
        })
    }

    try {

        const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED )
        // console.log(uid, name )         
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }

    //Si todo sale bien 
    next();

}


module.exports = {
    validarJWT
}