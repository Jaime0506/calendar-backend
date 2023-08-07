const { response, request } = require("express");
const { validationResult } = require("express-validator");

// El manejo de errores se hace repetitio entre cada controller
// tenemos codigo exactamente igual, entocnes creamos un middleware,
// que nos permite condicionar si llamamos nuestro controller o no,
// en el middleware verificamos que no halla errores, si no hay errores
// next() ejecuta el siguiente middleware, en caso de que no halla mas,
// ejecuta el controllers, solo se ejectua el controllers, si no hay error
const validateFields = (req = request, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next();
};

module.exports = { validateFields };
