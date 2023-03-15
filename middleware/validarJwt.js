const jwt = require('jsonwebtoken')

const validarJwt = (req,res,next) => {
    const token = req.header('x-token')


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
         
        const payload =jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.id = payload.id
        req.name = payload.name // puede que haya que cambiar los parámetros

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next()
}

module.exports = {
    validarJwt
}