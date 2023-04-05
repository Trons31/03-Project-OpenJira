import { createContext } from 'react';
import { Entry } from '../../interfaces/entry';


interface ContextProps { 
      entries : Entry[]; 
            
      //METHODS DE NUESTRO PROVIDER
      addNewEntry: (description: string) => void;
      // Este metodo recibe dos argumentos uno de tipo entrada para nuestras entradas y otro de tipo boolean para la reatroalimentacion de la actualizacion de la data de las entradas
      upDateEntry: (entry: Entry,showSnackbar: boolean) => void;

      deleEntry: (id: Entry) => void;
  
 }


// Creamos nuestro contexto y tipamos o creamos los parametros o propiedades que tendra nuestro context para ello una forma muy bonita es con la terminacion AS y el nombre de nuestra props
export const EntriesContext =  createContext({} as ContextProps );