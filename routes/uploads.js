const express=require('express')
const { cargarArchivos } = require('../controllers/upload.controllers.js')

const routherUploads=express.Router()


routherUploads.post('/',cargarArchivos)

module.exports={
    routherUploads
}