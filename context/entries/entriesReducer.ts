import { stat } from 'fs';
import { Entry } from '../../interfaces';
import { EntriesState } from './';


// Creamos nuestra accion para tiparla y decir que tipo de acciones recibira nuestro SWITCH
type EntriesActionType = 
| { type: '[Entry] Add-Entry', payload: Entry  }  // definimos nuestra primera accion y le decimos que su tipo es del que esta dentro de las comillas de nuestro type
                               // TODO: EL PAYLOAD ES LA IMFORMACION ADICIONAL QUE RECIBIREMOS APARTE DE NUESTRO TYPE DE ACCION
| { type: 'Entry  Update-Entry', payload: Entry }

| { type: 'Refresh-Load', payload: Entry[] }

| { type: 'delete Entry', payload: Entry }
                               

// para definir varias accion colocamos el caracter de tuberia que es : |


// El reducer es una funcion sumamente sencilla, recibe un estado, una accion, y produce un nuevo estado.
export const entriesReducer = ( state:EntriesState, action : EntriesActionType ): EntriesState => { // Recibimos nuestro estado y lo tipamos en esta caso es de tipo Entriesstate y importamos nuestro interface EntriesState por lo tanto tendremos las propiedades que estan en la interface EntriesState y le podremos cambiar el estado, tambien recibimos la accion
//Le decimos a nuestra funcion que el valor de retorno es de tipo EntriesState al terminar los parentesis le colocamos ' :  ' y lo tipamos 
// una vez creada nuestra accion la tipamos y le decimos que sera de tipo en esta caso : EntriesActionType

        switch (action.type) { // Recibimos la accion previamente tipada en nuestro switch para evaluarlas y que entre en su respectivo case.
           case '[Entry] Add-Entry': // recibimos una accion del espeficado tipo
              return{ // regresamos un nuevo estado
                ...state, // Hacemos una copia de todas las propiedades que tiene el state y solo modificamos la que deseamos 
                entries: [...state.entries, action.payload]
              }                             // TODO: CARGAMOS NUESTRA IMFROAMCION ADICIONAL QUE COMO ES DE TIPO ENTRY CONTIENE TODAS LAS PROPIEDADES DE LA ENTRADA

            case 'Entry  Update-Entry':
                return {
                  // TODO: DESESTRUCTURAMOS EL STATE QUE CONTIENE LA DATA DE NUESTRAS ENTRADAS
                  ...state,
                  entries: state.entries.map( e => {
                    if( e._id === action.payload._id ){
                      // TODO: ACTUALIZAMOS LA IMFORMACION DE NUESTRA ENTRADA CON LA IMFORMACION DE LA ENTRADA QUE VIENE POR EL PÁYLOAD
                      e.status = action.payload.status;
                      e.description = action.payload.description;
                    }
                    // TODO: RETORNAMOS LA ENTRADA ACTUALIZADA
                    return e;
                  })
                }
            case 'Refresh-Load':
              return{
                ...state,
                entries : [...action.payload]
              }

            case 'delete Entry' :
              return{
                ...state,
                entries: []
              }  

          
       default:
         return state;
      }

}