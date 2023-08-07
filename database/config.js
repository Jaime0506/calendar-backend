const mongoose = require('mongoose')

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log('DB-ONLINE')

    } catch (error) {
        console.log(error)
        throw new Error("Error al inicializar la Base de datos")
    }
}

module.exports = {
    dbConection,
}