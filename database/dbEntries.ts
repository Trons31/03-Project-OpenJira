import { isValidObjectId } from "mongoose"
import { db } from "./";
import { Entry, IEntry } from "../models";


export const dbEntryforID = async(id: string): Promise<IEntry | null> => {
    
    // TODO: VALIDAMOS SI EL ID QUE RECIBIMOS NO ES UN ID DE MONGO CON LA PROPIEDAD ISVALIDOBJECTID(PASAMOS EL ID) NEGANDOLA RETORNAMOS NULL
    if( !isValidObjectId(id) ) return null; 
    
    await db.conect(); // CONECTAMOS A LA BASE DE DATOS

    const entry = await Entry.findById(id).lean(); // Otenemos toda la data que esta asociedad al id y con la propiedad lean solo traera la data necesaria

    await  db.disconect();// DESCONECTAMOS DE LA BASE DE DATOS

    // TODO: AL RETORNAR LA ENTRADA ESTO NOS DARA ERROR PORQUE EL ID QUE NOS CREA MONGO NO ESTA SIENDO SERIALIZADO Y DEVEMOS HACERLO
     return JSON.parse(JSON.stringify(entry)); // Retornamos la entrada que se alamcena en nuestra constante depues de la consulta  por el ID
              

     // PARSE : Convierte una cadena de notación de objetos de JavaScript (JSON) en un objeto
     // STRINGIFY :  Convierte un valor de JavaScript en una cadena de notación de objetos de JavaScript (JSON)
}