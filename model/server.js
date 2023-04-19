const express=require("express")
const dotenv=require("dotenv")
const { router } = require("../routes/usersRoutes.js")
const conectionDB = require("../database/config.js")
const { routerAuth } = require("../routes/auth.js")
const {routerCategorias } = require("../routes/categorias.js")
const { routerProductos } = require("../routes/productos.js")
const { routerBuscar } = require("../routes/buscar.js")
dotenv.config()


class Server {
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        
        this.paths={
            usuarios:'/api/usuarios',
            auth:'/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar'
        }
        this.middleware()
        this.routes()
        this.conectarDB()
    }

    async conectarDB(){
        await conectionDB()
    }
    middleware(){
        this.app.use(express.static('public'))
        //Para que me lea y reciba peticiones JSON
        this.app.use(express.json())
    }
    routes(){
        //Aqui podemos colocar todas nuestras rutas
        this.app.use(this.paths.auth,routerAuth)
        this.app.use(this.paths.usuarios,router)
        this.app.use(this.paths.categorias,routerCategorias)
        this.app.use(this.paths.productos,routerProductos)
        this.app.use(this.paths.buscar,routerBuscar)

    }


    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }


}

module.exports=Server