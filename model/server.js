const express=require("express")
const dotenv=require("dotenv")
const { router } = require("../routes/usersRoutes.js")
const conectionDB = require("../database/config.js")
const { routerAuth } = require("../routes/auth.js")
dotenv.config()


class Server {
    constructor(){
        this.app=express()
        this.port=process.env.PORT

        this.usersPath='/api/usuarios'
        this.userAuth='/api/auth'
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
        this.app.use(this.userAuth,routerAuth)
        this.app.use(this.usersPath,router)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }


}

module.exports=Server