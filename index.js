const express = require('express')

// Habilitar uso de variables de entorno
require('dotenv').config()

// Crear servidor express
const app = express();

// Directorio Publico
app.use(express.static('./public'))

// Lectura y parseo del body
app.use(express.json())

// Rutas
app.use('/api/auth', require('./routes/auth'))

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor on ${process.env.PORT}`);
});
