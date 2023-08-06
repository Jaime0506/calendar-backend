/* Ruta: host + /api/auth */
const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const { loginUser, createUser, renewToken } = require("../controllers/auth");

// Puedo agregar middlewares, o un arreglo de middlewares
// que son funciones que se van a ejecutar antes que las de
// controllers
router.post(
    "/",
    [
        check("email", "El email no es valido").isEmail().escape(),
        check("password", "El password debe ser mayor a 5 caracteres") .isLength({ min: 6 }) .escape(),
    ],
    loginUser
);

router.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").notEmpty().escape(),
        check("email", "El email es obligatorio").isEmail().escape(),
        check("password", "El password debe ser mayor de 5 caracteres") .isLength({ min: 6 }) .escape(),
    ],
    createUser
);

router.get("/renew", renewToken);

module.exports = router;
