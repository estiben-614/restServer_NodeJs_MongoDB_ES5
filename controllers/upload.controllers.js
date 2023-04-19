
const express=require('express')
const {response,request}=express
const path = require('path');
const { subirArchivo } = require('../middlewares/subirArchivos');


const cargarArchivos=async(req,res)=>{
    //archivo es el nombre (key) con el que subimos el archivo en postman 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivos que subir o no viene el archivo');
      return;
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
            msg2:error
        })
    }
}

module.exports={
  cargarArchivos
}