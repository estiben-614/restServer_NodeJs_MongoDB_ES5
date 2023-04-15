const { request, response } = require("express")

const validarRoles=(...roles)=>{

    //Se consigue esta info gracias a validarJWT que se ejecuta primero
    //const {nombre,role}=req.usuario

    return (req=request,res=response,next)=>{
        //console.log(roles,req.usuario.role)

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg:`El usuario ${req.usuario.nombre} no es ninguno de los siguientes roles ${roles}`
            })
        }
        next()

    }
}

module.exports={
    validarRoles
}