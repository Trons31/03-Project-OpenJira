import { useContext } from "react";

import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import { UiContext } from "../../context/ui";



const menuItems: string[] = ['Inbox','Starred','Send','Email','Stafds']


export const Sidebar = () => {
   
    //Desde podemos tener acceso a nuestro provider debido a que en la rama de nuestra aplicacion esta arriba de sidebar 
    //Usamos el useContext para tener acesso a ese contexto


    // El use context debemos colocarlo dentro de nuestro comopnente react o dentro de nuestra funcion de flecha
         //En esta llaves desestructuramos nuestro contexto
    const { sidebarMenuOpen,closeSideMenu }  = useContext(UiContext) // colocamos el contexto que creamos en el use context para tener acceso a todos los elementos que tenemos en nuestro UiContext y poder desestructurar todas las propiedades y metodos que tenemos en el.
    


  return (
  
    <Drawer  
    anchor="left" // Declaramos la poscicion que tendra nuestro drawe o sidebar
    open={ sidebarMenuOpen } // Declaramos el valor con que iniciara el drawen Open: Abierto || Close : cerrado   ....... Una vez creado nuestro el context,provider y reducer utilizamos nuestro contexto y colocamos la propiedad que hemos desetructado en nuestro Drawer property Open,
    onClose={ closeSideMenu} // Propiedad para cerrar nuestro drawer que recibira una funcion
    >{/* El DRAWER es una propiedad de MATERIAL UI que nos ofrecera el sidebar */}

      <Box sx={{ width: 250  }} > {/* la propiedad SX no proporciana estilos propios de css y para ello hacemos dobles llavesm, si no especificamos nada el el widht son pixeles */}
      <Box sx={{ padding: ' 5px 10px ' }} > {/* la propiedad SX no proporciana estilos propios de css y para ello hacemos dobles llaves  */}
        <Typography variant="h5" > Menu </Typography> {/* La propiedad variant proporciona la etiqueta de H que deseemos en esta caso un h5 */}
      </Box>
      
      <List> {/* Llamamos a nuestra propieda List de MATERIAL Ui que nos ofrecera una lista */}
         {
            menuItems.map((text,index) => ( // Regresemos un JSX.element 
              <ListItem button key={text} > {/* Llamamos a nuestra propieda ListItem de MATERIAL Ui que nos ofrecera una lista  TODO:_ SIEMPRE QUE UTILIZAMOS MAP DEBEMOS UTILIZAR LA PROPIEDAD KEY EN NUESTRO COMPONENTE LA KEY QUE RECIBE ES EL VALOR DEL ARREGLO*/}
                   <ListItemIcon>{/* Llamamos a nuestra propieda ListItemIcon de MATERIAL Ui que nos ofrecera una lista de icocnos */}
                      { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />  } {/* Nuestro index es el indicador de nuesta poscision en el arreglo y dependiendo de ella alternamos los iconos */}
                   </ListItemIcon>
                   <ListItemText> {/* Llamamos a nuestra propieda ListItemText de MATERIAL Ui que nos ofrecera una lista para colocar la descripcion de nuestro icono  */}
                    { text }
                   </ListItemText>
              </ListItem>
              
            ))
         }
      </List>

       <Divider  /> {/* Llamamos a nuestra propieda Divider de MATERIAL Ui que nos ofrecera una linea para dividir nuestro sidebar  */}

       <List> {/* Llamamos a nuestra propieda List de MATERIAL Ui que nos ofrecera una lista */}
         {
            menuItems.map((text,index) => ( // Regresemos un JSX.element 
              <ListItem button key={text} > {/* Llamamos a nuestra propieda ListItem de MATERIAL Ui que nos ofrecera una lista */}
                   <ListItemIcon>{/* Llamamos a nuestra propieda ListItemIcon de MATERIAL Ui que nos ofrecera una lista de icocnos */}
                      { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />  } {/* Nuestro index es el indicador de nuesta poscision en el arreglo y dependiendo de ella alternamos los iconos */}
                   </ListItemIcon>
                   <ListItemText> {/* Llamamos a nuestra propieda ListItemText de MATERIAL Ui que nos ofrecera una lista para colocar la descripcion de nuestro icono  */}
                    { text }
                   </ListItemText>
              </ListItem>
              
            ))
         }
      </List>


      </Box>

    </Drawer>
  )
}
