const express=require('express')
const { login, googleSigIn } = require('../controllers/authContoller.js')
const { validarCampos } = require('../middlewares/validar_campos.js')
const { body } = require('express-validator')
const routerAuth=express.Router()

routerAuth.post('/login',[body('correo','El correo es obligatorio').isEmail(),
                          body('password','El password es obligatorio y de minimo 6 caracteres').not().isEmpty().isLength({min:6}),validarCampos],
  login)

routerAuth.post('/google',[body('id_token').not().isEmpty(),validarCampos],googleSigIn)
module.exports={
    routerAuth
}