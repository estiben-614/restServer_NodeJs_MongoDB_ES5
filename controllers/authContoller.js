const express=require('express')
const { Usuario } = require('../model/usuario.js')
const {response, request}=express
const bcrypt=require('bcrypt')
const { generarToken } = require('../helpers/generarJWT.js')
const { googleVerify } = require('../helpers/google-verify.js')


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

        //Verificar si el usuario está activo
        if(usuario.estado=="false"){
            return res.status(400).json({
                msg:'Usuario/password incorrecto - usuario inactivo'
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

//GoogleSignIn y la info del token
 const googleSigIn=async(req=request,res=response)=>{
    
    const {id_token}=req.body

    //Traemos la info el token
    const {nombre,correo,imagen}=await googleVerify(id_token)

    //Verificamos si en DB hay un usuario con ese correo, si lo hay, trae su info
    let usuario= await Usuario.findOne({correo})

    //Si no existe
    
    if(!usuario){
        //Lo creamos
        data={
            nombre,
            correo,
            imagen,
            role:'USER_ROLE',
            google:true,
            password:'f'
        }
            
            usuario=new Usuario(data)
            //lo guardamos
            await usuario.save()
            console.log(`Usuario ${usuario.nombre} creado`)
    }
    //Si existe, revisemos si se encuentra activo
     if(usuario.estado=="false"){
         return res.status(401).json({
         msg:'Usuario bloqueado, contactese con el ADMIN'
        })
        }
    //Generar Token JWT
    const token= await generarToken(usuario.id)

    res.json({
        usuario,
        token
    })
 }

 

module.exports={
    login,
    googleSigIn
}