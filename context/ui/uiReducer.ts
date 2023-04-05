import { UiState } from './UiProvider';

// NUESTRAS FUNCIONES TYPESCRIPT DEBEN TENER LA NOMENCLATURA LOWER CAMELCASE


// Creamos nuestra accion para tiparla y decir que tipo de acciones recibira nuestro SWITCH
type UiType = 
|{ type: 'Ui -Open Sidebar' } // definimos nuestra primera accion y le decimos que su tipo es de y el valor que esta dentro del string
|{ type: 'Ui -Close Sidebar' }// definimos nuestra primera accion y le decimos que su tipo es de y el valor que esta dentro del string
|{ type: 'Ui -OpenEntry', payload: boolean } // Accion para nuestra entrada
|{ type: 'Ui -Start Draging' }
|{ type: 'Ui -End Draging' }

// para definir varias accion colocamos el caracter de tuberia que es : |


// El reducer es una funcion sumamente sencilla, recibe un estado, una accion, y produce un nuevo estado.
export const uiReducer = ( state:UiState, action : UiType ): UiState => { // Recibimos nuestro estado y lo tipamos en esta caso es de tipo UIstate y importamos nuestro interface UiSatate por lo tanto tendremos las propiedades que estan en la interface UiState y le podremos cambiar el estado, tambien recibimos la accion y le decimos que es de tipo ANY
//Le decimos que el valor de retorno es de tipo UiState al terminar los parentesis le colocamos : y lo tipamos 
// una vez creada nuestra accion la tipamos y le decimos que sera de tipo en esta caso : UiType, ya no sera de tipo ANY

        switch (action.type) { // Recibimos la accion previamente tipada en nuestro switch para evaluarlas y que entre en su respectivo case.
          case 'Ui -Open Sidebar': // recibimos una accion del espeficado tipo
             return{ // regresamos un nuevo estado
               ...state, // Hacemos una copia de todas las propiedades que tiene el state y solo modificamos la que deseamos 
               sidebarMenuOpen : true,
             }

          case 'Ui -Close Sidebar' :// recibimos una accion del espeficado tipo
              return{// regresamos un nuevo estado
               ...state,
               sidebarMenuOpen: false,
             }

          case 'Ui -OpenEntry' :
            return{
             ...state,
             isAddinEntry: action.payload
            }    

            case 'Ui -Start Draging':
              return {
                ...state,
                isDraging : true,
              }

              case  'Ui -End Draging':
              return {
                ...state,
                isDraging : false,
              }

       default:
         return state; //TODO: Cuando utilizamos un switch para validar el type que recibimos del tipo de accion debemos devolver por defecto siempre el state de nuestro Reducer
      }

}