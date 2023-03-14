
const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcryptjs')
const { generarJwt } = require('../helpers/jwt')

/* const getUser = async (req, res) => {
    const userName = req.body.nombre

    try {
        const usuario = await Usuario.find({ nombre: userName })

        return res.status(200).json({
            ok: true,
            msg: 'Obteniendo el usuario',
            data: usuario
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }

} */




const crearUsuario = async (req, res) => {



    try {
        const usuario = await Usuario.findOne({ email: req.body.email })
        console.log(usuario)
        if (usuario == null) {
            const nuevoUsuario = new Usuario(req.body)
            let salt = bcrypt.genSaltSync(10);
            nuevoUsuario.pass = bcrypt.hashSync(req.body.pass, salt)
            const nuevoUsuarioData = await nuevoUsuario.save()
            console.log(nuevoUsuarioData.id)
            const token = await generarJwt(nuevoUsuarioData.id, nuevoUsuarioData.nombre)
            return res.status(201).json({
                ok: true,
                msg: 'Usuario creado',
                token: token
            })
        } else {
            console.log(req.body)
            return res.status(401).json({
                ok: false,
                msg: 'El email ya existe',
            })
        }

    } catch (error) {
        if (error) {
          return  res.status(500).json({
                ok: false,
                msg: 'No se ha podido crear el usuario'
            })
        }
    }


}

const loginUser = async (req, res) => {

    try {
        const usuario = await Usuario.findOne({ email: req.body.email });

        if (usuario == null) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            })

        } else if (usuario.pass != req.body.pass) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o usuario incorrectos',
            })
        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Accediendo a la base  de datos',
                data: usuario
            })
        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUser
}