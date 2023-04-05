 import { createContext } from 'react';
 
 
 interface ContextProps { 
 sidebarMenuOpen : boolean; // estas props deben ser las misma que creemos en nuestron uiReducer
 isAddinEntry : boolean; // Props de tipo booleana para abrir nuestra entrada
 isDraging : boolean;
 // Funtion of UiProvider
 openSideMenu :() => void; // Creamos nuestra Props que sera la funcion que tenemos en nuestro UiProvider para que TypeScript la reconosca
 closeSideMenu :() => void;
 setisAddinEntry: (addingEntry: boolean) => void;


 startDraging: () => void;
 endDraging: () => void
  }
 
 
 // Creamos nuestro contexto y tipamos o creamos los parametros o propiedades que tendra nuestro context para ello una forma muy bonita es con la terminacion AS y el nombre de nuestra props
 export const UiContext =  createContext({} as ContextProps );



