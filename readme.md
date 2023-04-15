#Webserver + RestServer + MongoDB

Bievenidos a mi RestServer usando ES5 (CommonJs)

Para las peticiones se recomienda usar POSTMAN

Para ejecutar, primero instalar las dependencias de node usando  ```npm install ```

Luego, realice peticiones a la siguiente URL  ```http://localhost:8080```

Para crear un usuario,  use una petición POST de la siguiente manera :   ``` {"nombre":"test1", 
                                                                              "google":true,
                                                                              "nuevoCampo":true,
                                                                              "correo":"test1@gmail.com",
                                                                              "password":"123456",
                                                                              "role":"ADMIN_ROLE"}```


 
    

Para ver todos los usuarios ingresados, use  las peticiones GET y que tienen los siguientes QUERY opcionales ```http://localhost:8080?desde=' '&limite= '   ' ```


Para hacer un login ingresar a ```http://localhost:8000/api/auth/login``` y realice una petición  POST con un usuario en su BD de la siguiente manera 
                                                                          ``` {"correo":"test20@gmail.com", 
                                                                             "password":"123456"}  ```
 . Se realizaran las correspondientes validaciones y si hay un login correcto se creará un JSONWEBSOCKET (JWS)

Para modificar y eliminar un usuario a partir de su ID, use  las peticiones PUT y DELETE ingresando el  parametro del ID  ```http://localhost:8000/<'type-userID-here>```.Adicional, para eliminar un usuario a partir de su ID primero debe autenticar un usuario (No el que se va a eliminar) y obtenga su JWS, luego realice la solicitud DELETE y agregue un header con el JWT  de la siguiente manera ``` x-token : < JWS_USER> ```. Una vez hecho lo anterior, el estado del usuario pasará de ```true``` a ```false``` indicando que fue eliminado

Para tener en cuenta, solo los usuarios con ```Role: ADMIN_ROLE,VENTAS_ROLE``` pueden realizar solicitudes DELETE
