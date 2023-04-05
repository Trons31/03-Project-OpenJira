//Creamos nuestro RESTFULL API

import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry,IEntry } from '../../../models'

// TODO: creamos una tuberia de opciones 
type Data = 
|{ message: string}
| IEntry[] // Esto es un arreglo de nuestra entradas para leer nuestra entradas en la base de datos
| IEntry // Esta es una entrada la necesitamos para ingrese nuestra entrada a la base de datos

export default function heandler(req: NextApiRequest, res: NextApiResponse<Data>) {

  // TODO: como manejaremos dos endpoints uno para crear y otro para eliminar utilizaremos un SWICTH

    // llamamos a nuestro NEXTAPIREQUEST o req, es para saber que nos estan haciendo una solicitud de un metodo espicifico, puede ser GET, PUT, DELET etc
    switch (req.method) {
        case 'GET': // Evaluamos si el metodo que recibimos es GET, Este REQUEST esta acociado a la lectura de nuestras entradas que hace parte de nuestro CRUD
                    // getEntries es una funcion que traera todas las entradas que tenemos en nuestra base de datos
            return  getEntries( res ) // En este caso ocuopamos la RESPONSE res que es la respuesta que le daremos al cliente si todo se ejcuta de manera correcta

        case 'POST': // Evaluamos si el metodo que recibimos es POST, Este REQUEST esta acociado a la creacion de una nueva entrada, que hace parte de nuestro CRUD
                     // Funcion
             return  postEntry( req, res) // En esta caso ocupamos la REQUEST porque vendra con la imformacion que necesitamos sea el registro de un formulario etc, y las RESPONSE o res sera la respuesta que le proporcionaremos al cliente
            
    
        default: // Si recibimos cualquier peticion que no sea GET es una peticion no valida y devovelmos un status 400
        res.status(400).json({ message: 'Endpoint no existe' })
    }

}


// Constante que llamamos en nuestro SWITCH: GET para leer nuestras entradas,  Tipamos nuestro NextApiResponse con la data que es un type que creamos en la cabezera
const getEntries = async( res: NextApiResponse<Data> ) => {

    // TODO: Como deseamos obtener la imformacion de nuestras entradas con el metodo GET, nos conectaremos a la base de datos


    // TODO: SIEMPRE QUE NOS CONECTEMOS A UNA BASE DE DATOS PARA HACER UNA PETICION LUEGO DE ESTO DEBEMOS DESCONECTARNOS.
    await db.conect(); // CONEXION A BASE DE DATOS
    // TODO: todas las peticiones que deseemos hacer devemos hacerlo despues de la conexion y justo antes de la desconexion a la base de datos


    // Creamos una constante que esperare a que nuestro entry de MODELS devuelva con la propiedad (find) todos los elementos y con la propiedad (sort) los ordenamos por fecha de manera ascendente
    const entries = await Entry.find().sort({ createDate: 'ascending'  })
     // TODO: LA PROPIEDAD FIND :Crea una consulta de búsqueda: obtiene una lista de documentos que coinciden con el filtro. para el filtro corchetes dentro de los parentesis

    await db.disconect(); // DESCONEXION A BASE DE DATOS


    // TODO: DEVOLVEMOS UNA RESPUESTA AL CLIENTE pero no sera un objeto como el que devolvemos por defalut en nuestro SWITCH, SERA DE TIPO IENTRY que contiene un arreglo de entradas
    res.status(200).json(entries)

}

// Constate que llamamos en nuestro SWITCH: case POST , para ingresar las entradas al formulario
const postEntry = async( req: NextApiRequest  ,res: NextApiResponse<Data> ) => {

    // TODO: desestructuramos la description que vendra de nuestro REQUEST BODY o req.body
    const { description = '' } = req.body;

    // TODO: Creamos una funcion y decimos que sera igual a una nueva entrada y grabamos lo que traera nuestra req.body
    const newEntry = new Entry({
        description,
        createDate: Date.now(),
    }) // Con esto ya creamos nuestra nueva entrada


    // TODO: PREPARAMOS NUESTRA BASE DE DATOS PARA INGRESAR NUESTRA NUEVA ENTRADA : newEntry
    // TODO: UTILIZAREMOS UN TRY-CATCH PARA EL MANEJO DE NUESTRA EXEPCIONES, POR SI LA BASE DE DATOS NO ESTA ARRIBA, O SI LA PERSONA ESTA INTENTA INSERTAR UN ESTADO QUE NO EXISTE ETC.
    
    try { 

     await db.conect(); // Nos conectamos a la base de datos
     await newEntry.save(); // TODO: llamamos a nuesta newEntry y a la propiedad SAVE  que Guarda este documento insertando un nuevo documento en la base de datos.
     await db.disconect(); //Nos desconectamos de la base de datos

     // TODO: delvolvemos una res sera de un status 2001 que es un created
     return res.status(201).json(newEntry)
        
    } catch (error) { // SI ocurre un error lo manejamos con el catch
         await db.disconect(); // si existe un error nos desconectamos de la base de datos 
         console.log(error)

         // Devolvemos un res a nuestro cliente de status 500 para decir que hubo un error del lado del servidor
         return res.status(500).json({ message:' Algo salio mal' })
    }
    


  

}
