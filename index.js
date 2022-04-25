const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');

require('dotenv').config();

// crear el servidor de aplicacion de express 
const app = express()

//connexion a la base de datos
dbConnection();

//Creacion de la carpeta publica
app.use(express.static('public'))    //directorio de carpeta public

//lectura del body
app.use( express.json() )

// Rutas 
app.use('/api/auth', require('./routes/auth'))

// Manejar todas las demas rutas, para problema al cargar dashboard
app.get('*', ( req, res = response )=>{
    res.sendFile( path.resolve( __dirname, 'public/index.html') ); //cargar proyecto de angular
})


app.listen( process.env.PORT, ()=>{
    console.log(`Servidor corriendo el puerto ${process.env.PORT}`)
});