const {request,response}=require('express')
const { Usuario } = require('../model/usuario.js')
const bcrypt=require('bcrypt')
const { validationResult } = require('express-validator')

exports.userGet=async (req=request,res=response)=>{

    //http://localhost:8000/api/test?desde=2&limite=3
    const {desde,limite}=req.query
    //Quiero que las promesas se ejecuten a la vez para que no se crucen
    //Quiero que solo me traiga todos los usuarios que tenga estado :true

    const [total,usuario]= await Promise.all([Usuario.countDocuments({estado:true}),
                        Usuario.find({estado:true})
                        .skip(desde)
                        .limit(limite)]
                        )
    res.json({
        msg:'Hello from GET controller',
        usuario,
        total
    })
}

exports.userPut=async(req=request,res=response)=>{
    const {id}=req.params
    const {password,google,correo,...resto}=req.body

    if(password){
        const salt= await bcrypt.genSaltSync()
        //crear una nueva propiedad llamada password con la contraseña encriptada
        resto.password=await bcrypt.hash(password,salt)
    }
    //Busquelo por el id y actualicelo con la info de resto
    const datosUsuario= await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        msg:'Hello from put controller',
       datosUsuario
    })
}

exports.userPost=async (req=request,res=response)=>{

   

    const {nombre,correo,password,role}=req.body

    //body=req.body

    const usuario=new Usuario({nombre,correo,password,role})

    //usuario es un objeto
    //console.log(usuario)

    //Encriptar password

    const salt = await bcrypt.genSaltSync(10)
    //password es lo que se va a hashear
    usuario.password=await bcrypt.hashSync(password,salt)

    
    //const {nombre,apellido}=req.body

    await usuario.save()
    res.json({
        msg:'Hello from post controller',
        usuario
        //nombre,
        //apellido
    })
}

exports.userDelete=async (req=request,res=response)=>{

    
    const {id}=req.params
    //Borrar fisicamente
    //const usuario=await Usuario.findByIdAndDelete(id)
    
    //Encuentra al usuario por su ID y le cambia el estado a false 
    const usuarioEliminado= await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        msg:'Hello from DELETE controller',
        usuarioEliminado
    })
}

