const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) =>{

    const payload = { uid, name }

    return new Promise( (resolve, reject )=>{
        
        jwt.sign( payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'24h'                             //duracion del token
        }, (error, token)=>{
            if (error) {
                //salio mal 
                console.log(error)
                reject(error)
            }else{
                //salio bien
                resolve(token)
            }
        })
    })
}


module.exports = {
    generarJWT
}