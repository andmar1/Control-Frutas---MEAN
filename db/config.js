const mongoose = require('mongoose');

const dbConnection = async() =>{
    try {
        await mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });

        console.log(`DataBase Online`)

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de la inicializacion de la BD')
    }
}

module.exports = {
    dbConnection
}