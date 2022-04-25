const express = require('express');
const cors = require('cors')

// crear el servidor de aplicacion de express 
const app = express()

//lectura del body
app.use( express.json() )

// Rutas 
app.use('/api/auth', require('./routes/auth'))


app.listen( 4000, ()=>{
    console.log(`Servidor corriendo el puerto ${4000}`)
});