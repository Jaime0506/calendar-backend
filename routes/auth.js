/* Ruta: host + /api/auth */
const express = require("express");
const { check } = require("express-validator");

const { loginUser, createUser, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

const router = express.Router();
// Puedo agregar middlewares, o un arreglo de middlewares
// que son funciones que se van a ejecutar antes que las de
// controllers
router.post(
    "/login",
    [
        check("email", "El email no es valido").isEmail().escape(),
        check("password", "El password debe ser mayor a 5 caracteres") .isLength({ min: 6 }) .escape(),
        validateFields
    ],
    loginUser
);

router.post(
    "/register",
    [
        check("name", "El nombre es obligatorio").notEmpty().escape(),
        check("name", "El nombre debe tener mas de 3 caracterez").escape().isLength({ min: 4 }),
        check("email", "El email es obligatorio").isEmail().escape(),
        check("password", "El password debe ser mayor de 5 caracteres") .isLength({ min: 6 }) .escape(),
        validateFields
    ],
    createUser
);

router.get("/renew", renewToken);

module.exports = router;
