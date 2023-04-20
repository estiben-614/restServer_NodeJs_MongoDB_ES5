
const express=require('express')
const {response,request}=express
const path = require('path');
const { subirArchivo } = require('../middlewares/subirArchivos');
const { Usuario } = require('../model/usuario');
const { Producto } = require('../model/producto');
const fileUpload = require('express-fileupload');
const { existsSync, unlinkSync } = require('fs');


const cargarArchivos=async(req,res)=>{
    //archivo es el nombre (key) con el que subimos el archivo en postman 
    //Si no hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
      
    }
   
    try {
        //Si no se ponen extensiones, por default pondrá extensionesValidas=['png','jpg','jpeg','gif']
        const nombre=await subirArchivo(req.files,undefined,'img')
        res.json({
            nombre
        })

    } catch (error) {
      console.log(error)
        res.json({
            msg:error
        })
    }
}

const actualizarImagen=async(req,res)=>{

  //archivo es el nombre (key) con el que subimos el archivo en postman 
    //Si no hay un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
     
    }
    //Recuperamos los parametros de la request
    const {id,coleccion}=req.params

    //Puede ser Usuario/Producto
    let modelo

    try {
      switch (coleccion) {
        case 'usuarios':
          //Si colección es usuarios, significa que estamos trabajando con el modelo Usuario
          //Buscamos el usuario que tenga ese ID
           modelo= await Usuario.findById(id)

          if(!modelo){
            return res.json({
              msg:`No existe un usuario con el id:b ${id}`
            })
          }
          break;
        case 'productos':
          //Si colección es productos, significa que estamos trabajando con el modelo Producto
          //Buscamos el producto que tenga ese ID
          modelo= await Producto.findById(id)

          if(!modelo){
            return res.json({
              msg:`No existe un producto con el id: ${id}`
            })
          }
          break;
        default:
          break;
      }
      //Muestra la info del usuario/producto con ese ID
      //console.log(modelo)

      
      //Verifica si ya hay una imagen en el usuario/producto 
      if(modelo.img){
        //Obtenemos la ruta de donde se creó la imagen
        const imagenPath=path.join(__dirname,'../uploads/',coleccion,modelo.img)

        //Revisamos si existe un archivo con esa ruta
        if(existsSync(imagenPath)){
          //Si existe lo eliminamos
          unlinkSync(imagenPath)
        }
      }
      //Seguimos para guardar la imagen nueva en DB
      
    } catch (error) {
      console.log(error)
        return res.json({
            msg:error
        })
    }     
    
    //Al usuario/producto le agrega la propiedad img y sube el archivo
    //Recordar que req.files es el archivo que estamos subiendo, undefined son las extensiones por default y coleccion el nombre de la carpeta donde
    modelo.img=await subirArchivo(req.files,undefined,coleccion)
    await modelo.save()

    return res.json({
      modelo
    })

}

module.exports={
  cargarArchivos,
  actualizarImagen
}