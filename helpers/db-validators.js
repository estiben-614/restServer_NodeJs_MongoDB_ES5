const { Role } = require("../model/role")
const { Usuario } = require("../model/usuario")

//Verificar si el rol ingresado concuerda con los guardados en la BD
const validacionRole=async(role='')=>{
    const roleExiste=await Role.findOne({role})

    if(!roleExiste){
        throw new Error(`El rol ${role} no está dentro de la BD`)
    }
 }

//Verificar si un email ya fue agregado a la BD
const validacionEmail=async(correo='')=>{
    const emailExist=await Usuario.findOne({correo})
    if(emailExist){
        throw new Error(`El correo ${correo} ya fue registrado`)
 }
}

//Verificar que el ID si exista en  la BD 

const validacionID=async(id='')=>{
    const idExist= await Usuario.findById(id)
    if(!idExist){
        throw new Error(`El id ${id} no existe`)
 }
}
 module.exports={
    validacionRole,
    validacionEmail,
    validacionID
    
 }