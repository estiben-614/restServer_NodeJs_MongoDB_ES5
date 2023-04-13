const mongoose=require('mongoose')
const {Schema,model}=mongoose


const UsuarioSchema= new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE','USER']
    },
    estado:{
        type:String,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})
//No mostrar algunos datos ingresados (password,__v) y unificar los demas en una sola propiedad (usuario)
UsuarioSchema.methods.toJSON=function(){
    const {password,__v,...usuario}=this.toObject()
    return usuario
}
//Recibe el nombre del modelo y un esquema con la data 
const Usuario=model('Usuario',UsuarioSchema)

//No mostrar el password, __v y unificar los demas en uno
//llamado usuario

UsuarioSchema.methods.toJSON= function(){
    const {_id,__v,password, ...usuario}=this.toObject()
    return usuario
}

module.exports={
    Usuario
}