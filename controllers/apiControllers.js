//https://mongoosejs.com/docs/api/query.html

const Servicio = require('../models/servicioModel')

// recoger todos los servicios
const getServicios = async (req, res) => {

    try {
        const servicios = await Servicio.find()
        console.log(servicios)
        return res.status(200).json({
            ok: true,
            msg: 'Obteniendo todos los servicios',
            total_servicios: servicios.length,
            limit: 30,
            data: servicios
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error al obtener los servicios'
        })
    }


}

// recoger un servicio
const getServicio = async (req, res) => {
    //recoger id - params
    const id = req.params.id

    const servicio = await Servicio.findOne({ _id: id })

    res.status(200).json({
        ok: true,
        msg: 'Obteniendo un servicio',
        data: servicio
    })
}





// crear un servicio
const crearServicios = async (req, res) => {
    const nuevoServicio = new Servicio(req.body)
    try {
        const nuevoServicioData = await nuevoServicio.save()

        return res.status(201).json({
            ok: true,
            msg: 'Creando un servicio nuevo',
            servicio: nuevoServicioData
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Habla con el admin'
        })
    }


}

// actualizar un servicio
const actualizarServicio = async (req, res) => {
    const id = req.params.id
    const servicio = req.body.servicio
    const descripcion = req.body.descripcion
    console.log(id, servicio, descripcion)

    try {

        const servicioAct = await Servicio.findOneAndUpdate({ _id: id }, { $set: { servicio, descripcion } }, { new: true })
        return res.status(201).json({
            ok: true,
            msg: 'Actualizando un servicio',
            data: servicioAct
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'Fallo al actualizar'
        })
    }


}


// eliminar un servicio
const eliminarServicio = async (req, res) => {
    const id = req.params.id
    const servicio = await Servicio.findOne({ _id: id })
    if (servicio == null) {
        return res.status(500).json({
            ok: false,
            msg: 'Ese servicio no existe'
        })
    } else {

        try {

            const serEli = await Servicio.findOneAndDelete({ _id: id }, { new: true })
            return res.status(200).json({
                ok: true,
                msg: 'Servicio eliminado',
                data: serEli
            })
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Fallo Eliminando un servicio'
            })
        }
    }
}



module.exports = {
    getServicios,
    getServicio,
    crearServicios,
    actualizarServicio,
    eliminarServicio,
    
}