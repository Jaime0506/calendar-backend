const { request, response } = require('express')
const Event = require('../models/Event')

// host + /api/events/get
const getEvents = async(req = request, res = response) => {
    
    // Con la funcion populate, llamamos la ref, creada en el modelo
    // y traemos su propiedad, del modelo creado anteriormente,
    // si deaseamos traer mas propiedades, bastara simplemente con
    // agregarlas al sgundo argumento, en el mismo string

    // .populate('user', 'name password {etc...}')
    const events = await Event.find().populate('user', 'name')

    res.json({
        ok: true,
        msg: 'Eventos',
        events
    })
}

// host + /api/events/new
const newEvent = async (req = request, res = response) => {
    const { uid, name } = req

    let event = new Event({...req.body})
    
    try {
        event.user = {
            uid,
            name
        } // console.log(event)

        const eventSaved = await event.save()

        return res.status(201).json({
            ok: true,
            eventSaved
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const uptadeEvent = async (req = request, res = response) => {

    const { uid, name } = req
    const eventID = req.params.id
    
    try {
        let event = await Event.findById(eventID)
        
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado el evento'
            })
        }

        if (event.user.uid.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: {
                uid,
                name
            }
        }

        const updateEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true })

        return res.json({
            ok: true,
            event: updateEvent
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}

const deleteEvent = async (req = request, res = response) => {
    const { uid } = req
    const eventID = req.params.id

    try {
        
        let event = await Event.findById(eventID)
        
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No se ha encontrado el evento'
            })
        }

        if (event.user.uid.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes los permisos necesarios'
            })
        }

        await Event.deleteOne({ _id: eventID})
        
        return res.json({
            ok: true,
            msg: 'Evento borrado',
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    newEvent,
    uptadeEvent,
    deleteEvent
}