const express=require('express')
const { Categoria } = require('../model/categorias')
const {response,request}=express

const crearCategoria=async (req=request,res=response)=>{
    //Recuperamos el nombre de la categoria enviado desde el body del postman
    const nombre=req.body.nombre.toUpperCase()
    console.log(nombre)
    //Verificamos si ya hay una categoria en DB con ese nombre
    
    const categoriaDB= await Categoria.findOne({nombre})
    console.log(categoriaDB)
    //Si el nombre existe
    if(categoriaDB){
        res.status(400).json({
            mag:`La categoria ${nombre} ya existe`
        })
    }

    //De lo contrario, lo guardamos
    datos={
        nombre,
        usuario:req.usuario._id
    }
    console.log(datos)
    const categoria= new Categoria(datos)
    await categoria.save()

    res.status(201).json(categoria)

}

const obtenerCategorias=async (req,res=response)=>{
   
    const [total,categorias]=await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
    ])

    res.json({
        total,
        categorias
    })
 
}
 const obtenerCategoriaPorId=async(req,res)=>{
   
    //Con esto recuperamos el id del query. //Recupera el ID  de la categoria
    const {id}=req.params
    const _id=id
    //Populate relaciona toda la info del ID que generó el catalogo
    const categoria= await Categoria.findById(_id).populate('usuario','nombre')

    if(!categoria){
        res.status(401).json({
            msg: `La categoria con id: ${_id} no está registrada en la BD`
        })
    }

    res.json({
        categoria
    })
}

const actualizarCategoria=async(req,res)=>{
    //Recupera el ID  a actualizar
    const {id}=req.params
   
    //Recupera lo enviado en la request del body
    const nombreCategoria=req.body.nombre.toUpperCase()
    const {nombre,...resto}=req.body
    
    const data={
        nombre:nombreCategoria,
        estado:resto.estado,
        usuario:req.usuario._id //Recordar que esa info la trae el validarJWT
    }

    const categoria=await Categoria.findByIdAndUpdate(id,data,{new:true})
    console.log(categoria)
    res.json({
        categoria
    })


}

const eliminarCategoria=async(req,res)=>{
    //Recupera el ID  a borrar
    const {id}=req.params
    const categoriEliminada=await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
    console.log(categoriEliminada)
    res.json({
        categoriEliminada
    })


}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria
}