const express=require('express');
const router=express.Router();
const { getServicios,getServicio,crearServicios,actualizarServicio,eliminarServicio}=require('../controllers/apiControllers')
const {check} =require('express-validator')
const {validarInputs}=require('../middleware/validarInputs')
const  {nodeMailerController} = require('../controllers/mailController')

// recoger todos los servicios

router.get('/servicios',getServicios);



// recoger un servicio
router.get('/servicios/:id',getServicio)


// crear un servicio
router.post('/servicios', [
    check('servicio', 'el servicio es obligatorio').not().isEmpty(),
    check('descripcion', 'la descripcion es obligatoria').not().isEmpty(),
    validarInputs
],crearServicios)

// actualizar un servicio
router.put('/servicios/:id', [
    check('servicio', 'el servicio es obligatorio').not().trim().isEmpty(),
    check('descripcion', 'la descripcion es obligatoria').not().trim().isEmpty(),
    validarInputs
],actualizarServicio)

// eliminar un servicio
router.delete('/servicios/:id',eliminarServicio)



//enviar mail por la pagina de web personal
router.post('/mail',  nodeMailerController)






module.exports=router