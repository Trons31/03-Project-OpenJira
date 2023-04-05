import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =  // La tuberia de tipos que creamos es para los res que devolvemos para las direfentes respuestas que estamos devolviendo deacuerdo a nuestras condiciones, funciones, etc
|{ message: string}
|IEntry
export default function heandler(req: NextApiRequest, res: NextApiResponse<Data>) {

   // TODO: para obtener un id en especifico 
   // Creamos una constante y desestructuramos de nuestra solicitud llamando a la propiedad query el id o req.query
   const { id } =req.query; // Una vez obtenido el id podemos llamar nuestra imformacion restante

   // TODO: Antes de llamar la imformacion restante creamos ciertas validaciones para que no procesemos imformacion no valida

   if( !mongoose.isValidObjectId( id ) ){ // Negamos si lo que nos devuelve la condicion el valido si no es valido el id retornamos un status 400
    return res.status(400).json({ message: ' id no valido ' + id })
   }


   switch (req.method) { // Definimos un Swithc para validar los metodos que recibiremos de la solicitud
    case 'PUT':
        // Devolvemos la funcion que actualizara nuestro registro  
        return updateEntry(req, res); // Le pasamos como argumentos la solicitud y la respuesta

    case 'GET': 
    
    return getEntry( req, res );

    case 'DELETE' :
     return deletEntry(req, res);
        
   
    default: // Si no recibimos un metodo valido devolvemos un status 400 bad Request
        return res.status(200).json({ message: ' Metodo no existe' }) 
   }


    
}

// Cremoa la funcion que actualizara nuestro registro
const  updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query; // Desestructuramos el id de nuestro req.query
 
    await db.conect(); // Nos conectamos a la base de datos

    // TODO: creamos una constante entryUpdate que almacenara toda la imformacion que nos devuelva la propiedad findById que devuelve toda la imformacion asociada al id que le pasamos
    const entryUpdate = await Entry.findById( id );

    if( !entryUpdate ){ // Creamos una validacion que niega si el id existe con signo de exclamacion al inicio de la funcion es decir si el id no existe entra y devuele un status 400 un bad request
    
      await db.disconect();  // nos desconectamos de la base de datos para mejor rendimiento
      return res.status(400).json({ message: ' no existe entrada con ese id: ' + id }) 

    }


    const {
        // desestrucutamos la data que vamos a actualizar

        description = entryUpdate.description,
        // TODO: aqui estamos diciendo que si la descripcion viene de nuestro body actualizaremos la imformacion si no mantendremos la que nos devuelve el di que buscamos
        status = entryUpdate.status

    } = req.body // desestrucutamos lo que viene de la solcitud de nuestro body


    // TODO: REALIZAREMOS UN TRY-CATCH PARA EL MANEJO DE NUESTRAS EXEPCIONES POR SI FALLA LA ACTUALIZACION QUE DESEAMOS REALIZAR
    try {


      // TODO: Creamos una funcion que actualizara nuestra imformacion apartir del id que obtuvimos, llamamos a la funcion : findByIdAndUpdate que recibe como argumento el id y luego los campos que vamos a actualizar
    const updateEntry = await Entry.findByIdAndUpdate( id,{ description, status },{ runValidators: true, new : true }  )
    // TODO: OTRA FORMA DE ACTUALIZAR NUESTRAS ENTRADAS 
    //  entryUpdate.description = description,
    //  entryUpdate.status = status,
    //  await  entryUpdate.save();

    res.status(200).json( updateEntry! ) // Como updateEntry puede no venir y ser nulo, le decimos a typescritp que siempre recibiremos un  updateEntry para que al colocar el funcion en las res no nos de error y para ello ponemos signo de esclamacion al final del nombre de nuestra funcion
    } catch (error) { // Si algo falla devolvemos un bad request o un status 400
      

      await db.disconect();

      return res.status(400).json({ message:' Erro del servidor ' })

    }    

}

// Metodod para obtener la entrada por el id
const getEntry = async( req: NextApiRequest,  res : NextApiResponse) => {
 
  const { id } = req.query;

  await db.conect();
 const getEntry = await Entry.findById( id ); // TODO: CUANDO LLAMAMOS A LA PROPIEDAD FINDBYID : Encuentra un solo registrp por su campo _id. findById(id) es casi* equivalente a findOne({ _id: id }). Si desea consultar por el _id de un documento, use findById() en lugar de findOne().
                 // TODO: DEBEMOS HACER SIEMPRE UN AWAIT
 await db.disconect();

  if( !getEntry ){
    return res.status(400).json({ message: ' Este id no existe ' + id })
  }
  
   return res.status(200).json( getEntry );

}


const deletEntry = async(req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;

  await db.conect();

  const deleteEntry = await Entry.deleteOne({ _id : id })

  await db.disconect();

}



