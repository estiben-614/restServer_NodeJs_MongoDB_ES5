const express=require('express')
const { Usuario } = require('../model/usuario.js')
const {response, request}=express
const bcrypt=require('bcrypt')
const { generarToken } = require('../helpers/generarJWT.js')


const login =async (req=request,res=response)=>{

    const {correo,password}=req.body

    try{
        //verificar si el email existe -- Encuentra al usuario con el correo que se envio en el POST
        const usuario= await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - Email no existe'
            })
        }

        //Verificar contraseña --Compara la contraseña del post con el guardado en la DB

        const validarPassword= await bcrypt.compareSync(password,usuario.password) 
        if(!validarPassword){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - Password incorrecto'
            })
        }

        //Generar Token
        const token= await generarToken(usuario.id)
        console.log(token)


        res.json({
            msg:'login ok',
            usuario,
            token
        })
    }

    catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Ocurrió un error, contactese con el administrador'
        })
    }
    
        
}

module.exports={
    login
}