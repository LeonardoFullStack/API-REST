
const Usuario = require('../models/usuarioModel')
const bcrypt = require('bcryptjs')
const { generarJwt } = require('../helpers/jwt')



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
                msg: 'Usuario registrado',
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
        const passwordOk = bcrypt.compareSync(req.body.pass, usuario.pass);
        console.log(passwordOk)
        if (usuario == null) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con este email no existe',
            })

        } else if (!passwordOk) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida',
            })
        } else {

            const token = await generarJwt(usuario._id, usuario.nombre)
            const user = {
                name: usuario.nombre,
                email: usuario.email,
                uid: usuario._id
            }

            return res.status(200).json({
                ok: true,
                msg: 'Login de usuario',
                user: usuario,
                token
            })
        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe'
        })
    }
}

const renew =async (req, res) => {

const {uid, nombre} = req.body //req o req.body??
const token = await generarJwt(uid, nombre)

    res.status(200).json({
        ok:true,
        msg: 'renew token',
        user: {
            uid,
            nombre
        },
        token
    })
}

module.exports = {
    crearUsuario,
    loginUser,
    renew
}