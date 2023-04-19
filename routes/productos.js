const express=require('express')
const { validarCampos } = require('../middlewares/validar_campos.js')
const { body, param } = require('express-validator')
const { validarJWT } = require('../middlewares/validarJWT.js')
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators.js')
const { validarRoles } = require('../middlewares/validar_roles.js')
const { crearProducto,obtenerProductos,obtenerProductoPorId, actualizarProducto, eliminarProducto,}=require('../controllers/productoControllers.js')
const routerProductos=express.Router()


//Crear productos - privado : Cualquier persona con un
//token válido ( debe autenticarse con validarJWT)
routerProductos.post('/',[validarJWT,body('nombre','El nombre es obligatorio').not().isEmpty(),
                                        body('categoria').isMongoId().custom(existeCategoriaPorId),validarCampos],crearProducto)

//Obtener productos - público - paginado
routerProductos.get('/',obtenerProductos)

//Obtener productos por ID - público 
routerProductos.get('/:id',[param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId),
validarCampos],obtenerProductoPorId)

//Actualizar un producto por ID - público 
routerProductos.put('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId),
validarCampos],actualizarProducto)

//Borrar un producto -Solo ADMIN_ROLE
routerProductos.delete('/:id',[validarJWT,param('id','No es un ID válido ').isMongoId().custom(existeProductoPorId), validarRoles('ADMIN_ROLE'),
validarCampos],eliminarProducto)


module.exports={
     routerProductos
}