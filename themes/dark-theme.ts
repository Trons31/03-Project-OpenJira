import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";



export const DarkTheme = createTheme({
    palette: {
        mode: 'dark', // La propiedad mode es para el modo que queremos que sea el estilo dark: negro o light: un blanco
        secondary:{
            main: '#28B463 '
        },
        primary:{
            main: '#0B5ED7'
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