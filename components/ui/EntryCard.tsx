import { FC, useContext,DragEvent } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography, CardHeader, Button } from '@mui/material';

import { EntrieState, Entry } from '../../interfaces';
import { EntriesContext } from '../../context/entries/';
import { UiContext } from '../../context/ui/UiContext';
import { DateFunction } from '../../utils/'


// Estas Card se mostraron en nuestro componenete EntryListItem

// TODO: Debido a que en EntryLisItem estamos utilizando este componente : EntryCard y le estamos mandando un objeto debemos crear las Props de ese objeto que nos estan mandando aqui, para recibirlo y desestructurarlo
interface Props {
  entry : Entry; //Tipamos nuestra propiead con la Entry que contiene los elementos que recibiremos de nuestro EntryListItem
}


export const EntryCard:FC<Props> = ({  entry }) => { // Desestructuramos nuestra Props
  //TODO: Definimos el useContext y lo asignamos a una constante para  desstructrar nuestra las propiedades que utilizaremos de nuestro uiContext
   const {startDraging, endDraging,isDraging} = useContext(UiContext)
   
   //TODO: Definimos el useContext y lo asignamos a una constante para  desstructrar nuestra entrada y tener acceso a la data
   const {entries} = useContext(EntriesContext)

   //TODO: Definimos el useRouter y lo asignamos a una constante para tener acceso a todas las propiedades de nuestro router
   const router = useRouter();

   

   const  onDragStart = ( event: DragEvent ) => {
        // console.log(event)
        event.dataTransfer.setData('text', entry._id);

        startDraging();
   }


   const onDragEnd = () =>{
     
     endDraging(); 
  }
  
  //TODO: Funcion de flecha para la NAVEGACION CON RUTA DINAMICA
  const onClikNavegation = () => {
    router.push(`/entries/${ entry._id  }`) // TODO: llamamos a la constante que tiene nuestro router y invocamos la propiedad push, le pasamos el directorio que tiene nuestra ruta dinamica y el id, para ello formateamos el dato con ${}  y bacstis o ` para poder formatear datos `
  }
 





// En nuestro return podremos utilizar el objeto que nos estan mandando a este componente desde EntryListItem
  return (
    <Card
      sx={{ marginBottom: 1 }}
      // TODO:  eventos drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // TODO: LLamamos a la propiedad onClik de react para que cada vez que le den clik a nuestra card podemos hacer la navegacion dinamica con nuestro id y para ello llamamos funcion que la navegacion en la propuiedad onClick
      onClick={ onClikNavegation } 
    >
      {isDraging ? (
        <>
          <CardActionArea>
            <CardContent>
              <Typography sx={{ whiteSpace: "pre-line" }}>
                {" "}
                {entry.description}{" "}
              </Typography>{" "}
              {/* La propiedad  PRE-LINE es para cuando escribamos en un cuadro de texto, los saltos de linea se muestren como saltos de linea  */}
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
            >
              <Typography variant="body2"> 30 mins </Typography>
            </CardActions>
          </CardActionArea>
        </>
      ) : (
        <CardActionArea>
          <CardContent>
            <Typography sx={{ whiteSpace: "pre-line" }}>
              {" "}
              {entry.description}{" "}
            </Typography>{" "}
            {/* La propiedad  PRE-LINE es para cuando escribamos en un cuadro de texto, los saltos de linea se muestren como saltos de linea  */}
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
          >
                                          {/* LLamamos a nuestro funcion de que nos devuele la fecha y le pasamos la fecha que viene de nuestra entry */}
            <Typography variant="body2"> { DateFunction.getFormatDistanceToNow(entry.createDate) } </Typography>
          </CardActions>
        </CardActionArea>
      )}
    </Card>
  );
}
