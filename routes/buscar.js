const express=require('express')
const { buscar } = require('../controllers/buscar_controllers')

const routerBuscar=express.Router()

routerBuscar.get('/:coleccion/:termino',buscar)

module.exports={
    routerBuscar
}