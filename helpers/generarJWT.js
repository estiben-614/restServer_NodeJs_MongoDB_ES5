const jwt= require('jsonwebtoken')

const generarToken=(uid='')=>{

    return new Promise((resolve,reject)=>{
        
        const payload={uid}
        console.log(payload)
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{expiresIn:'1h'},function(err, token) {
            if(err){
                console.log(err)
                reject(err)
            }
            else{
                resolve(token)
            }
          })
    })
    
}

module.exports={
    generarToken
}