const {Schema,model}=require('mongoose')

const ProductoSchema=Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        //Relación con el modelo Usuario
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        //Relación con el modelo Categoria
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripción:{ type:String},
    disponible:{type:Boolean,default:true},
    img:{type:String}
})

//Busca/crea la colección producto ---> Pasa de Producto al plural "productos"
const Producto=model('Producto',ProductoSchema)

module.exports={
    Producto
}