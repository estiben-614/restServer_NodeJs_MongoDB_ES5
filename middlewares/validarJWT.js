const { request, response } = require("express");
const { Usuario } = require("../model/usuario");
const { verify } = require("jsonwebtoken");

//TODO PARA UN USUARIO ATENTICADO EN LOGIN
//Validamos con el Token generado por el login

const validarJWT=async (req=request,res=response,next)=>{

    //Obtenemos el Token del header x-token establecido en postman 
    const token=req.header('x-token')
    //Si no hay un token
    if(!token){
        res.status(401).json({
            msg:'No hay un Token en la petición'
        })
    }

    try {

        //Verificamos que el token exista en DB y extraemos su uid. Sin destructurar, obtenemos lo mismo, mas fecha de creación y expiracion
        const {uid}= await verify(token,process.env.SECRETORPRIVATEKEY)
        //console.log(uid)

        //Con el uid buscamos el usuario al que corresponse
        const usuario= await Usuario.findById(uid)

        //En caso de que el usuario no exista
        if(!usuario){
            res.status(401).json({
                msg:'El usuario no existe en DB'
            })
        }

        //Verificamos que el usuario tenga estado true

        if(!usuario.estado){
            res.status(401).json({
                msg:'Token no válido - usuario con estado : false'
            })

        }

        //Creamos una propiedad usuario en la request que contiene toda la data del usuario atenticado 

        req.usuario=usuario
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token inválido'
        })
    }
}

module.exports={
    validarJWT
}