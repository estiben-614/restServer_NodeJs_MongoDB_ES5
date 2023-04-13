const mongoose=require('mongoose')

const conectionDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Base de datos conectada')
    }

    catch(error){
        console.log(error)
        throw new Error('No se pudo conectar  a la BD')
    }

}

module.exports=conectionDB