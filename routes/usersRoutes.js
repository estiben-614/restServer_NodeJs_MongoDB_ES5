const express=require('express')
const { userGet, userPut, userPost, userDelete } = require('../controllers/userControllers.js')
const { body,param } = require('express-validator')
const { validarCampos } = require('../middlewares/validar_campos.js')
const { Role } = require('../model/role.js')
const { validacionEmail, validacionRole, validacionID } = require('../helpers/db-validators.js')
const router=express.Router()



router.get('/',userGet)

router.put('/:id',[param('id','El ID no es valido').isMongoId().custom(validacionID),validarCampos],userPut)
router.post('/',[body('correo','El correo no es válido').isEmail().custom(validacionEmail),
                 body('nombre','El nombre es obligatorio').not().isEmpty(),
                 body('password','El password es obligatorio y debe ser mayor o igual a 6 letras').isLength({min:6}).not().isEmpty(),
                 //body('role','El rol no es permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
                 body('role').custom(validacionRole),
                validarCampos],userPost)
                 
router.delete('/:id',[param('id','El ID no es valido').isMongoId().custom(validacionID),validarCampos],userDelete)

module.exports={router}