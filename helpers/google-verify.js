const {OAuth2Client} = require('google-auth-library');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Verifica el token y decodifica la info dentro de este
async function googleVerify(token='') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });

  //Muestra la info del token
  const {name,email,picture} = ticket.getPayload();
  nombre=name
  correo=email
  imagen=picture
  return {nombre,correo,imagen}

}

module.exports={
  googleVerify
}