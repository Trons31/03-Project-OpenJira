// Para generar este bloque de codigo utilizamos el snippet : NEXTAPI

import type { NextApiRequest, NextApiResponse } from 'next'
import { db,seedData } from '../../database';
import { Entry } from '../../models';

type Data = {
    message: string
}

export default async function heandler(req: NextApiRequest, res: NextApiResponse<Data>) {
 
    if( process.env.NODE_ENV === 'production' ){ // Cuando hagamos peteiciones  a nuestro API seed validamos que estos procedemientos no se ejecuten cuando estemos en modo produccion, y devolvemos un status ( 401 )
        //La porpiedad  status  de  Server Response object o abreviado res maneja el estatus que tendra nuestra aplicacion a las respuetas HTTP 
        return res.status(401).json({message: 'No tiene acceso a este servicio'});
    }

    // como llamamos la propiedad AWAIT  nustra funcion heandler debe ser asincrona y nos conectamos a la base de datos
    await db.conect();
    // En el espacio que tenemos entre conect y disconenct TODO: podemos hacer cualquier peticion a la base de datos inserciones,lecturas etc.
    // TODO: Creamos modelo para poder insertar en la base de datos modelo que tendra un schema 

    await Entry.deleteMany(); //Elimina todos los documentos que coinciden con las condiciones de la colección. Se comporta como remove(), pero elimina todos los documentos que coinciden con las condiciones independientemente de la opción única.
    await Entry.insertMany( seedData.entries ); //Inserta uno o más documentos nuevos como una única llamada insertMany al servidor MongoDB.
                            // TODO: llamamos a nuestro objeto y la pasamos las entries

    //llamamos a nuestra conexion del archivo de de la carpeta database
    await db.disconect();

    res.status(200).json({ message: 'Todo se realizo correctamente' })
}