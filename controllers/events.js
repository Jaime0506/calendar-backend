const { request, response } = require('express')

// host + /api/events/get
const getEvents = (req = request, res = response) => {

    const { uid, name } = req

    res.json({
        ok: true,
        msg: 'Eventos',
        uid,
        name
    })
}

// host + /api/events/new
const newEvent = (req = request, res = response) => {
    const { uid, name } = req

    res.json({
        ok: true,
        msg: 'Nuevo evento',
        uid,
        name
    })
}

const uptadeEvent = (req = request, res = response) => {
    const { uid, name } = req

    res.json({
        ok: true,
        msg: 'Actualziar evento',
        uid, 
        name
    })
}

const deleteEvent = (req = request, res = response) => {
    const { uid, name } = req

    res.json({
        ok: true,
        msg: 'Borrar evento',
        uid,
        name
    })
}

module.exports = {
    getEvents,
    newEvent,
    uptadeEvent,
    deleteEvent
}