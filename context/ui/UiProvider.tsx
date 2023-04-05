import React, { FC, useReducer } from 'react'
import { UiContext,uiReducer } from './'; // Exportamos nuestro UiContext


//NUESTRO PROVIDER SERA QUIEN PROVEERA LA IMFORMACION A LOS COMPONENTES QUE NECESITEMOS
//Este Provider debido a nuestros requerimientos como es el menu debe ser global nuestro provider para desde cualquier lugar poder abrirlo y cerrarlo, para ello lo importamos en nuestro _App.tsx

export interface UiState { // Creamos nuestro interface y la exportamos
     sidebarMenuOpen : boolean; // Si no colocamos el interrogante que cierra TypeScript asume que esta propiedad es obligatoria.
     isAddinEntry : boolean;
     isDraging: boolean;
}


const Ui_INITIAL_STATE: UiState = { // Creamos una constante o una varibale y la tipamos o le decimos que es de tipo UiState por lo tanto debe recibir la propiedad sideMenuOpen y le pasamos el valor de false
     sidebarMenuOpen : false,
     isAddinEntry: false,
     isDraging: false,


}

interface Props { // Cremaos nuestras props locales para decirle  a nuestro functinal component que recibira childrens
     children? : JSX.Element | JSX.Element[] // El children o los children que recibira son de tipo JSXElement
}

   export const UiProvider:FC<Props> = ({ children }) => {  // Tipamos nuestro UiProvider y le diremos que es de tipo FC : functional component y le pasamos las props que recibira, y desestructuramos nuestro children

       const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE) //Creamos Nuestro useReducer que manejara el estado de nuestro contexto, la primera propiedad dentro de nuestro reducer es la funcion que hara que nuestro reducer cambie, y la segunda propiedad es el valor inicial que nuestro reducer Recibe.
   
      const openSideMenu = () => { // Creamos nuestro metodo o propiedad para cambiar el estado de nuestro menu como esta es una propiedad interna o local de este functional component y la necesitamos llamar en nuestro sidebar debemos regresarla en nuestro return 
          dispatch({type: 'Ui -Open Sidebar'}) // Este dispacth lo lee nuestro uiReducer y realiza la accion y mediante el Swicth que tenemos cambiamos el estado del sidebarMenuOpen
          // TODO: siempre que hagamos el dispacht debemos colocar ({ })  y adentro llamamos el type, es decir el tipo de accion que recibira nuestro reducer
      }

      const closeSideMenu = () => {
          dispatch({ type: 'Ui -Close Sidebar' })
      }


      const setisAddinEntry = (addingEntry: boolean) =>{
         dispatch({ type: 'Ui -OpenEntry', payload: addingEntry  })
      }

      const startDraging = () => {
        dispatch({ type: 'Ui -Start Draging' })
      }

      const endDraging = () => {
        dispatch({ type: 'Ui -End Draging' })
      }
      

        return (
           <UiContext.Provider value={{  // Llamaos a nuestro UiContext y le decimos que recibira un proveedor para ello colocamos punto al finalizar el nombre de nuestro UiContext y llamammos a la propiedad Provider
               ...state, // desestructuramos lo que esta en nuestro estado en este caso el siderMenuOpen que es la unica Props que recibe de nuestro tipado de UiState

               //Function
               closeSideMenu,

               //Function
               openSideMenu, // una vez que retornamos nuestra funcion debemos crearla en nuestro contexto para que pueda lerla, para saber el tipado que tendra nuestra funcion dejamos caer el cursor sobre el nombre de nuestra funcion y ella nos dira que tipo de funcion es.
               
               setisAddinEntry,


               startDraging,
               endDraging

            }}>
              { children }
           </UiContext.Provider>
)
}

