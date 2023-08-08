const express = require('express')
const { dbConection } = require('./database/config')
const cors = require('cors')

// Habilitar uso de variables de entorno
require('dotenv').config()

// Crear servidor express
const app = express();

// Conexion con la DB
dbConection()

//CORS
app.use(cors())

// Directorio Publico
app.use(express.static('./public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor on ${process.env.PORT}`);
});
