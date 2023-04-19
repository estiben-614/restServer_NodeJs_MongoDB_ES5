const express=require('express')
const { subirArchivos } = require('../controllers/upload.controllers.js')

const routherUploads=express.Router()


routherUploads.post('/',subirArchivos)

module.exports={
    routherUploads
}