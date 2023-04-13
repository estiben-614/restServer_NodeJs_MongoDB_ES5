const {Schema,model}=require('mongoose')

const roleSchema=new Schema({
    role:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
})

//Busca/crea la colección roles ---> Pasa de Role al plural "roles"
const Role=model('Role',roleSchema)

module.exports={
    Role
}