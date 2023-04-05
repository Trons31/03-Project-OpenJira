import { useContext } from 'react';
import NextLink from 'next/link';


import { AppBar, Box, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'; // Importamos nuestro icono de Mateial Ui


import { UiContext } from '../../context/ui/';

const menuItem:String[]  = [ 'Home', 'taks' ]

export const Navbar = () => {

  const navbar: boolean = false ;

//Importamos el useContext y le pasamos nuesto contexto que es el UiContext

       // En estos parentesis desestructuramos las propertys que tiene nuestro contexto
const {openSideMenu} = useContext(UiContext)
  
  return (
    <AppBar position='sticky'  >  {/* Nuestro AppBar sera el Navbar, este tendra el color por defecto de negro por lo tanto deberemos cambiarle el aspecto que viene por defecto en MATERIAL UI y lo haremos en nuestro archivo TS themes en nuestro tema correspondiente */}
     <Toolbar>
        {/*Este IconButton de matrial Ui sera quien abrira nuestro Menu */}
        <IconButton
        size='large'
        edge='start'
        // TODO: Para llamar varias funciones en un evento de OnClik despues de hacer la funcion de flecha debemos abrir llaves y podremos llamar todas las funciones que querramos
        onClick={ openSideMenu } // Utilizamos la propiedad onclick para cuando le den click a nuestro boton utilizamos el metodo o la funcion que cambiara el estado de nuestro menu para abrirlo
        > {/* Con la propiedad ICONBUTTON podremos agregar iconos a nuestra pagina importados de MATERIAL UI  */}
           <MenuOutlinedIcon /> {/*Lo utilizamos como si fuera un componente normal */}
        </IconButton> 

        {/* Como tal NextLink no es una propiedad de next solo cambiamos el nombre en la importacion, realmente estamos utilizando link de next que pide como parametro el href, y le pasamos el pasHref */}
        <NextLink href="/" passHref >
          { /* Link de material Ui */}
         <Link underline='none' color='white' >
         <Typography variant='h6' > Task - Notes Lists </Typography>
         </Link>
        </NextLink>

       

       <Box display='flex'  >
         {
          navbar
          ?(
            menuItem.map(value => (
              <Typography sx={{ marginLeft:2 }} > { value } </Typography>
            ))
          )
          :(
            ""
          )
         
         }
       </Box>

     </Toolbar>
    </AppBar>
  )
}
