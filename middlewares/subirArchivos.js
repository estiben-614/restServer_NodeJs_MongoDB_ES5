const path = require('path');
const express=require('express')
const { v4: uuidv4 } = require('uuid');
uuidv4()

 const subirArchivo=(files,extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{
    return new Promise((resolve,reject)=>{
      //Ver archivo subido
    //console.log(req.files)
    let sampleFile;
    let uploadPath;
    
    //Archivo contiene la info del archivo subido
    const {archivo}=files
    //split devuelve un array
    const NombreCortado= archivo.name.split('.')
    const extension= NombreCortado[NombreCortado.length-1]

    //Validar que la extensión sea válida
    if(!extensionesValidas.includes(extension)){
        
        return reject(`La extensión ${extension} no es permitida ${extensionesValidas}`)
        
    }
    
    //Para cambiar el nombre del archivo una vez se suba
    const nombreArchivo=uuidv4()+'.'+extension

    //Crea la carpeta donde se van a guardar las imagenes
    //uploadPath contiene toda la ruta donde su subió el archivo
    uploadPath = path.join( __dirname, '../uploads/',carpeta, nombreArchivo );
  
    archivo.mv(uploadPath, function(err) {
      if (err) {
        return reject(err)
      }
      
      return resolve(nombreArchivo)
    });
    
    })
    
}

module.exports={
    subirArchivo
}