const express=require('express');
const { validationResult } = require('express-validator');
const {response,request}=express


const validarCampos=(req,res,next)=>{
     //Para acumular el error en caso de que no sea un email
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     next()
}

module.exports={ validarCampos}