const {Schema,model}=require('mongoose')

const CategoriaSchema=new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true
    },

    usuario:{
        type:Schema.Types.ObjectId,
        //Es el nombre del modelo Usuario
        ref:'Usuario',
        require:true

    }
})

//Busca/crea la colección roles ---> Pasa de Role al plural "roles"
const Categoria=model('Categoria',CategoriaSchema)

module.exports={
    Categoria
}