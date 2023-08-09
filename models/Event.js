const { Schema, model } = require('mongoose')

const eventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

// Si quiero cambiar la forma en que mongose, me retorna la creacion de un
// elemento en la base de datos, puedo personalizarlo de la siguiente manera
eventSchema.method('toJSON', function() {

    // mongoose, por defento al crear un id unico y un __v que usa para trabajar internamente
    // nos retorna del await model.save(), estos valores con esta particuliariad
    // {...properties, _id, __v}, pero si nosotros desemoas cambiar este comportamiento por defecto
    // podemos apuntar al this.toObject(), extraer las propiedades que deseamos cambiar o quitar,
    const { __v, _id, ...object} = this.toObject()

    // Y asignarlas al objeto con el nombre de propiedad que deseemos
    object.id = _id

    // Esto solo hara que al mostrar la respuesta del { await model.save() } se muestre id, 
    // en vez de _id, pero en la base de datos se guardara como siempre se ha guardado, con _id y __v
    return object
})

module.exports = model('Event', eventSchema)