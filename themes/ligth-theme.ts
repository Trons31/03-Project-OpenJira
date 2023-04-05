import { createTheme } from "@mui/material"
import { grey, red } from "@mui/material/colors"

export const LightTheme = createTheme({

    palette:{
        mode: 'light',
        background:{
            default: grey[300]
        },

         primary :{
            main : '#4a148c'
         },

         secondary : {
            main : '#19857b'
         },
         error: {
            main : red.A400
         },
    },
    
    components :{
        MuiIconButton :{// Llamamos a las propiedades que deseamos combiarle el aspecto que trae por defecto con el complemento MUI antes del nombre de nuestra propiedad en esta caso MuiIconButton
         defaultProps: {},// Propiedades por defecto
          styleOverrides : {
            root:{
               color: '#fff'// Aqui cambiamos el color por defecto de nuestro IconButton
            }
          }
        },
        MuiAppBar :{ // Llamamos a las propiedades que deseamos combiarle el aspecto que trae por defecto con el complemento MUI antes del nombre de nuestra propiedad en esta caso MiuAppBar
         defaultProps : { // Aqui colocamos los valores que queremos que tenga nuestro AppBar como la POSITION, ELEVATION entre otros 
            elevation : 0,
         }, // Propiedades por defecto que recibe nuestro Appbar como la elevation que es la sombra que sale debajo de nuestro Appbar
         styleOverrides : { // Aqui colocamos los estilos que queremos que tenga nuestro Appbar como el background o el color 
             root : {
                 background : '#148F77', // Aqui cambiamos el color por defecto de nuestro AppBar
             },
         },
     },
    },

})  
