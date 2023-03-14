const express=require('express')
require('dotenv').config()
const cors=require('cors')
const {conexion}=require('./helpers/bdConnect');



//Express
const app=express();
const port=process.env.PORT;


//setear carpeta estatica
app.use(express.static(__dirname+'/public'))
//
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


//Conectar
conexion()
//cors
app.use(cors())
//rutas
app.use('/api/v1',require('./routers/apiRouter'))
app.use('/api/v1/users',require('./routers/apiUsersRouter'))
/* app.use('api/v1/users', require('./routers/apiUsersRouter')) */


//listener
app.listen(port,()=>{
    console.log(`Servidor a la escucha del puerto ${port}`)
})
//ruta del api de usuarios


/* const Servicio=require('./models/servicioModel');

const newData = {
    servicio: 'servicio randoman',
    descripcion: 'servicio randomero desc'
}

Servicio.create(newData); */