const express = require("express");
const { check } = require("express-validator");

const {
    getEvents,
    newEvent,
    uptadeEvent,
    deleteEvent,
} = require("../controllers/events");
const { validateFields } = require("../middlewares/validateFields");
const { validateJWT } = require("../middlewares/validateJWT");
const { isDate } = require('../helpers/isDate')

// host + /api/events
const router = express.Router();

// Todas nuestras rutas, requiren de un middleware, validateJWT, entonces
// puedo especificarle a mi roputer, que cualquier ruta que contenga,
// teng que pasa por mi validateJWT, evitando la repeticion del mismo
router.use(validateJWT);
// De aca para abajo todas mis rutas pasan por nuestro middleware

router.get( "/get", getEvents);

router.post(
    "/new",
    [
        check("title", "El titulo es requerido").notEmpty().escape(),
        check('start', "La fecha de inicio es requerida").custom(isDate),
        check('end', "La fecha de finalizacion es requerida").custom(isDate),
        validateFields,
    ],
    newEvent
);

router.put("/update/:id", uptadeEvent);

router.delete("/delete/:id", deleteEvent);

// router.get('/get', [validateJWT], getEvents)

// router.post('/new', [validateJWT], newEvent)

// router.put('/update/:id', [validateJWT], uptadeEvent)

// router.delete('/delete/:id', [validateJWT], deleteEvent)

module.exports = router;
