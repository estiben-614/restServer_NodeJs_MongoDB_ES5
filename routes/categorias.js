const express=require('express')
const { validarCampos } = require('../middlewares/validar_campos.js')
const { body, param } = require('express-validator')
const { validarJWT } = require('../middlewares/validarJWT.js')
const { crearCategoria, eliminarCategoria, actualizarCategoria, obtenerCategoriaPorId, obtenerCategorias } = require('../controllers/categoriaController.js')
const { existeCategoriaPorId } = require('../helpers/db-validators.js')
const { validarRoles } = require('../middlewares/validar_roles.js')
const routerCategorias=express.Router()


//Crear categoria - privado : Cualquier persona con un
//token válido ( debe autenticarse con validarJWT)
routerCategorias.post('/',[validarJWT,body('nombre','El nombre es obligatorio').not().isEmpty(),validarCampos],crearCategoria)

//Obtener categorias - público - paginado
routerCategorias.get('/',obtenerCategorias)

//Obtener categorias por ID - público 
routerCategorias.get('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId),
validarCampos],obtenerCategoriaPorId)

//Actualizar una categoria por ID - público 
routerCategorias.put('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId),
validarCampos],actualizarCategoria)

//Borrar una categoria -Solo ADMIN_ROLE
routerCategorias.delete('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeCategoriaPorId), validarRoles('ADMIN_ROLE'),
validarCampos],eliminarCategoria)


module.exports={
    routerCategorias
}