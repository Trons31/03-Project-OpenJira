import React, { FC, useEffect, useReducer } from 'react'
import {  Entry } from '../../interfaces';
import { EntriesContext,entriesReducer } from './'; // Exportamos nuestro UiContext
import { v4 as uuidv4 } from 'uuid'; // Como uuid no esta construido con typescrtip cuando lo importemos por primera vez nos dara un error ,pero tenemos el archivo de definicion de tipos que aparece dejando el cursos sobre el error : @types/uuid
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';
                                    //  para instalarlo debemos agregarlo con yarn add y -D en mayusculo para que sea un dependencia de desarollo


export interface EntriesState { // Creamos nuestro interface y la exportamos
     entries : Entry[]; // Si no colocamos el interrogante que cierra TypeScript asume que esta propiedad es obligatoria.
     showSnackbar : boolean;
}


const Entries_INITIAL_STATE: EntriesState = { // Creamos una constante o una varibale y la tipamos o le decimos que es de tipo EntriesState por lo tanto debe recibir la propiedad entries y le pasamos el valor correspondiente
     entries : [ ], // Como tipamos la propiedad entries de la interface EntriesState con la interface que creamos en nuestras interfaces que se llama Entry podemos tener acceso a los elementos que tiene esa interface
     showSnackbar: false,     
    
     
}

interface Props { // Cremaos nuestras props locales para decirle  a nuestro functinal component que recibira childrens
     children? : JSX.Element | JSX.Element[] // El children o los children que recibira son de tipo JSXElement
}

   export const EntriesProvider:FC<Props> = ({ children }) => {  // Tipamos nuestro EntriesProvider y le diremos que es de tipo FC : functional component y le pasamos las props que recibira, y desestructuramos nuestro children
       // Definmos nuestro SnackBar para los mensajes de retroalimentacion de actualizacion de la data de las entradas
       const { enqueueSnackbar} = useSnackbar();
      
       const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE); //Con la propiedad useReducer podremos cambiar la imformacion de nuestros propiedades o del state inicial

       /// TODO: CON ESTE METODO CUANDO LO EXPORTEMOS EN NUESTRO ARBOL DE COMPONENTES PODREMOS UTILIZARLO Y DE ESTA FORMA AGREGAR IMFORMACION A NUESTRAS CARDS
       const addNewEntry = async(description : string) => {

         // TODO: LLamamos a nuestro ENDPOINT llamando a la propiedad POST sabemos que solo colocamos slash y el directorio de nuestro ENDPOINT porque en nuestro entriesApi tenemos un baseUrl que toma el directorio Api
         const { data } = await  entriesApi.post('/entries',{ description }); // TODO:  IMPORTANT como segundo argumento que recibe el metodo POST es la data de nuestro body en esta caso la descripcion que estamos mandando del formulario

         dispatch({ type: '[Entry] Add-Entry', payload: data }) // TODO: HACEMOS EL DISPACHT A NUESTRO REDUCER QUE CON EL TIPO DE ACCION, Y EL PAYLOAD QUE ES LA IMFORMACION EXTRA QUE QUEREMOS MANDAR, CAMBIARA LA IMFORMACION QUE CORRESPONDA AL TYPEACCION, CON NUESTRA PAYLOAD QUE TIENE TODA LA NUEVA IMFORMACION


                // TODO: Ingresamos la imformacion desde el front-end
         //   const newEntry: Entry ={//Como estamos tipando nuestra constante y le decimos que sea de tipo Entry y este tipo requiere una propiedades no mostrara un error y es que nuestra constante debe tener las propiedades de Entry damos Crtl + . y seleccionamos add missing propertys
         //        _id: uuidv4(), // Agregamos el identificador unico universal
         //        description,
         //        createDate: Date.now(),
         //        status: 'Pending'
         //   }

          

       };

       const deleEntry = async({ _id }:Entry ) => {

         const { data } = await  entriesApi.delete<Entry>(`/entries/${_id}`);

         dispatch({ type: 'delete Entry', payload: data })
       }

       // TODO: Aqui llamaremos a nuestro endpoint que actualiara la data 
                                   // TODO: data desestructurada de nuestra ENTRY   
       const upDateEntry = async( { _id, description,status } : Entry, showSnackbar = false) => {
 
         // TODO: como esta actualizacion puede fallar manejaremos nuestras exepciones con un TRY-CATCH
         try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description , status } ) // TODO: llamamos a nuestro endpoint y le pasamos el metodo PUT para actualizar, pasamos la url                                                                                    // como en este caso manejamos una ruta con argumentos dinamicos pasamos el id de nuestra entrada con las bastics y luego la data que vamos a actualizar
            dispatch({ type: 'Entry  Update-Entry', payload : data })
           
         if( showSnackbar )
            enqueueSnackbar("Actualizado Correctamente",{
               variant: 'success',
               autoHideDuration: 1500,
               anchorOrigin: {
                  vertical: "top",
                  horizontal: 'right'
               }
            }
         
              
            );


         } catch (error) {
            console.log({ error })
         }
        
       }





       // TODO: Esto lo ejecutaremos la primera vez que la aplicacion sea cargada para traer nuestras entradas que estan en nuestra base de datos utilizamos nuestro RESTFULLAPI entries que ingrese las entradas a la base de datos
       const refreshEntries = async() => {
          // desestructuramos la data porque esta es la propiedad que contiene la imformacion de nuestras entradas si hacemos console:  log(nombre de la constante) veremos que la propiedad data tiene todas nuestras entradas
         const { data }  = await entriesApi.get<Entry[]>('/entries');
                                       // Tipamos esto con nuestra interface entries y le decimos que sera un arreglo de entradas
         dispatch({ type: 'Refresh-Load', payload: data })         
         // TODO: hacemos el dispatch para vizualizar nuestras entradas                      
       }

       useEffect(() => {
          refreshEntries();
         
       }, [])
       
     //  Esto lo ejecutaremos la primera vez que la aplicacion sea cargada TODO:


        return (
           <EntriesContext.Provider value={{  // Llamamos a nuestro EntriesContext y le decimos que recibira un proveedor para ello colocamos punto al finalizar el nombre de nuestro EntriesContext y llamammos a la propiedad Provider
               ...state,

               // METHODS
              
               addNewEntry, // TODO: cuando agreguemos nuestro metodo nos señalara error por primera vez porque se requiere en nuestro contexto, debemos dejar el mouse sobre el error y el parte superior nos aparecera el tipo de que recibe nuestro metodo eso lo copiamos en las Props de nuestro contexto
               upDateEntry,
               deleEntry,
            }}>
              { children }
           </EntriesContext.Provider>
)
}