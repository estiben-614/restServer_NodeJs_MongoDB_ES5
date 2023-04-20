const express=require('express')
const { cargarArchivos, actualizarImagen } = require('../controllers/upload.controllers.js')
const { param } = require('express-validator')
const { coleccionValida } = require('../helpers/db-validators.js')
const { validarCampos } = require('../middlewares/validar_campos.js')

const routherUploads=express.Router()

routherUploads.post('/',cargarArchivos)
//Ejemplo de envio de peticion : http://localhost:8080/api/uploads/usuarios/6438212370267c8833af2355    --Colección trae el valor recuperado del link, es decir,usuarios
routherUploads.put('/:coleccion/:id',[param('id','No es un ID válido').isMongoId(),
    param('coleccion','No es una colección válida').custom(coleccion=>coleccionValida(coleccion,['usuarios','productos'])),validarCampos],actualizarImagen)

module.exports={
    routherUploads
}