const { response, request } = require('express')
const bycrypt = require('bcryptjs')

const UserModel = require('../models/User')
const { generateJWT } = require('../helpers/JWT')

// host + /api/auth/login
const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body
    
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrecta'
            })
        }
        
        // Verificar las contraseñas
        const isValidPassword = bycrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrecta'
            })
        }

        // Generamos JWT
        const token = await generateJWT(user.id, user.name)

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
}

// host + /api/auht/new
const createUser = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        let user = await UserModel.findOne({ email })
        
        if (user) {
            return res.status(400).json({
                ok: true,
                msg: 'El correo ya se encuentra registrado'
            })
        }
        
        user = new UserModel(req.body)

        // encriptar contraseña
        const salt = bycrypt.genSaltSync()
        user.password = bycrypt.hashSync(password, salt)

        await user.save()

        // Generar JWT
        const token = await generateJWT(user.id, user.name)

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error.message
        })
    }
}

// host + /api/auth/renew
const renewToken = async (req = request, res = response) => {
    const { name, uid } = req
    
    // Generar nuevo JWT
    const token = await generateJWT(uid, name)

    res.json({
        ok: true,
        name,
        uid,
        token
    })
}

module.exports = {
    loginUser,
    createUser,
    renewToken
}