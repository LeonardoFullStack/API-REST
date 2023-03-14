const mongoose=require('mongoose')


const conexion=async()=>{

    try {
        const respuesta=await mongoose.connect(process.env.URI_CONNECT)
        console.log('conectado a bbdd')
        return respuesta
        
    } catch (error) {
        return {
            ok:false,
            msg:'Error al conectar con la base de datos'
        }
    }   

}


module.exports={
    conexion
}