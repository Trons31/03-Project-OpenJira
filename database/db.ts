import mongoose from 'mongoose';

// Establecemos la conexion 

/** TODO: Estados  de conexion a nuestro dbMongoose
 *  0 = disconected
 *  1 = conected
 *  2 = conecting
 *  3 = disconecting
 */

const mongoConection = { 
    isConnected: 0 // TODO: constante que manejara los estados de nuestra conexion se inicializa en cero es decir desconectado.
}


//Creamos una Constante para conectarnos a MongoDb
export const conect = async() => {
 
    // validamos si ya estamos conectados 
    if (mongoConection.isConnected){ 
        //Si ya estamos conectados devolvemos un mensage 
        console.log('Ya estamos conectados')
        return;
    }
    
    // validamos si ya existe una conexion o que nuestro estado no sea desconectado
    if(mongoConection.isConnected > 0){ 

        //si existe un estado en nuestra conexion pasamos el estado que tenemos a nuestra propiedad mongoConection para que isConected lo almacene
        mongoConection.isConnected = mongoose.connections[0].readyState; 

        //Validamos que el estado que tiene nuestra conexion sea conectado o igual a 1.
        if ( mongoConection.isConnected === 1){ // PARA EVALUAR SON TRES IGUALES Y PARA ASIGNAR ES UNO SOLO
           //Devolvemos un mensage que indica que estamos utilizando la conexion que ya existia.
           console.log('usando conexion anterior')
           return;
        }

        await mongoose.disconnect(); // por ultimo Nos desconectamos de nuestra base de datos
    }
    
    
    // TODO: Conexion a MongoDB
    // Si no cumple las condiciones anteriores es porque no existe una conexion entonces vamos a establecerla
    //como es un metodo asincronico le decimos a nuestra constante que espera haste que mongoose.connect realize la conexion utilizando la variable de entorno que contiene la URL de la conexion a nuestra base de datos
    await mongoose.connect(process.env.MONGO_URL || '' ); // la propiedad mongosose de conect espera una cadena de conexion como la que tenemos en mongose compass pero como esta conexion es algo que puede cambiar lo haremos con una variable de entorno
    mongoConection.isConnected = 1;
    console.log('conectado a mongo db', process.env.MONGO_URL)
    // TODO: Conexion a MongoDB
}



//Creamos una constante para desconectarnos de MongoDb
export const disconect = async() => {

    if( process.env.NODE_ENV === 'development' ) return; // Condicion para evaluar que si estamos en modo de desarrollo no nos desconecte de la base de datos.

    if( mongoConection.isConnected === 0 ) return;
    
    // Metodo asincronico  mongoose.disconnect para desconectarnos de la base de datos..
    await mongoose.disconnect();
    // Establecemos el estado de nuestra conexion igual a Cero es decir desconectado.
    mongoConection.isConnected = 0 
    // Devolvemos un mensage que indica que nos hemos desconectados de mongoDb
    console.log('Desconectado de MongoDb')
}