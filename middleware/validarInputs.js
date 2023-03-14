const {validationResult} = require('express-validator');

const validarInputs = (req,res,next) => {
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errores:errors.mapped() // el mapped hace que no se cree un objeto de errores dentro de errores
        })
    }
    next()
}

module.exports={
    validarInputs
}