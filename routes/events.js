const express = require('express')

const { getEvents, newEvent, uptadeEvent, deleteEvent } = require('../controllers/events')
const { validateJWT } = require('../middlewares/validateJWT')

// host + /api/events
const router = express.Router()

// Todas nuestras rutas, requiren de un middleware, validateJWT, entonces
// puedo especificarle a mi roputer, que cualquier ruta que contenga,
// teng que pasa por mi validateJWT, evitando la repeticion del mismo
router.use(validateJWT)
// De aca para abajo todas mis rutas pasan por nuestro middleware

router.get('/get', getEvents)

router.post('/new', newEvent)

router.put('/update/:id', uptadeEvent)

router.delete('/delete/:id', deleteEvent)


// router.get('/get', [validateJWT], getEvents)

// router.post('/new', [validateJWT], newEvent)

// router.put('/update/:id', [validateJWT], uptadeEvent)

// router.delete('/delete/:id', [validateJWT], deleteEvent)

module.exports = router