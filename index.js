const express = require('express');
const cors = require('cors')

require('dotenv').config();

// crear el servidor de aplicacion de express 
const app = express()

app.use(express.static('public'))    //directorio de carpeta public

//lectura del body
app.use( express.json() )

// Rutas 
app.use('/api/auth', require('./routes/auth'))


app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo el puerto ${process.env.PORT}`)
});