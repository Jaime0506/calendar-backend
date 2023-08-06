const { response, request } = require('express')
const { validationResult } = require('express-validator')

const loginUser = (req = request, res = response) => {
    const { email, password } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'login',
        ...req.body
    })
}

const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body
    // Los errores que dispara el middleware se almacenan en validationResult
    // Pasandole los datos de la peticion (req)
    const errors = validationResult(req)
    
    // express-validator ofrece funciones para verificar, si existe 
    // errores, mapearlos para mostrarlos
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'register',
        ...req.body
    })
}

const renewToken = (req = request, res = response) => {
    

    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    loginUser,
    createUser,
    renewToken
}