const express=require('express')
const {response,request}=express
const path = require('path');
const subirArchivos=(req,res)=>{
    let uploadPath;
        //archivo es el nombre (key) con el que subimos el archivo en postman 
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0)  {
    return res.status(400).json({msg:'No hay archivos que subir o no viene el archivo'});
  }

  const {archivo}=req.files

  uploadPath = path.join( __dirname, '../uploads/', archivo.name );
  


  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).json({msg:err});

    res.json({
        mag:'File uploaded!' +uploadPath});
  });
}

module.exports={
    subirArchivos
}