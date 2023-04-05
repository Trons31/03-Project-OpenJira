import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { UiProvider } from '../context/ui';
import { SnackbarProvider } from 'notistack';


import { LightTheme,DarkTheme } from '../themes/';
import { EntriesProvider } from '../context/entries';

// Cuando utilizamos contextos debemos importar aqui nuestros Providers de esos contextos
// Todos los componentes que creemos en nuestra aplicacion deben ir capitalizados

function MyApp({ Component, pageProps }: AppProps) {
  return (
 // Importamos nuestro notistack para las para las retroalimentacion de nuestro mensajes de SnackBar; 
<SnackbarProvider maxSnack={3}>
{/* Importamos nuestro provider que nos proveera la imformacion de nuestras entrys  */}
   <EntriesProvider>
     {/* Importamos nuestro provider que nos proveera la imformacion de nuestro menu para abrirlo y cerrarlo y que sea parte  de nuestra aplicacion */}
    <UiProvider> 
    {/*Utilizamos el ThemeProvider propiedad de Material Ui para aplicar nuestros temas e Importamos el tema que vamos a utilizar en nuestra aplicacion */}
        <ThemeProvider theme={DarkTheme} >
          <CssBaseline /> { /* TODO: DEFINIMOS EL CSSBASELINE PARA PODER EJECUTAR LOS ESTILOS DE NUESTRO TEMA */ }
          <Component {...pageProps} />
        </ThemeProvider>
   </UiProvider>
   </EntriesProvider>
</SnackbarProvider>

   
  
  )
}

export default MyApp
