import { FC, useContext, useMemo,DragEvent } from "react";

import { List, Paper } from "@mui/material"

import { EntriesContext } from "../../context/entries";
import { EntrieState } from "../../interfaces";
import { EntryCard } from "./EntryCard"
import { UiContext } from "../../context/ui";

import styles   from './styles.module.css'

interface Props { // TODO: Definimos las props que recibira nuestro componente
  status: EntrieState; // Creamos unas props satatus y la tipamos con nuestra interface EntriesState que tiene los estados predefinidos que recibiremos en la Card Pending
}

// Este sera el componente que listara los item de nuestra Card
export const EntryListItem:FC<Props> = ({ status }) => {

  // Leemos nuestro contexto
  const { entries,upDateEntry } = useContext(EntriesContext);


  // Memorizamos esta Funcion para que react no genera esta funcio cada vez que sea llamado este compenente y sea mas facil para app cargar la informacion del filtro
                                                                                                                        // TODO: DESPUES QUE MEMORIZAMOS ES IMPORTANTE QUE SI LA IMFORMACION CAMBIA DEBEMOS ACTULIZAR Y AGREGAR NUESTRO NUEVO ENTRY PARA QUE SE PUEDA VIZUALIZAR
  const entryByStatus = useMemo( (/*Memorizamos nuestro valor */) =>   entries.filter( entry => entry.status === status), [entries] )// TODO: Creamos una constante o funcion para utilizar nuestra entry propiedad de EntryContext para llamar la propiedad filter que Devuelve los elementos de una matriz que cumplen la condición especificada en una función de devolución de llamada.
                                                             // creamos la propiedad entry de Entry y la señalamos para llamar a nuestro status y crear la condicion

                                                     
    const nodragin  = (entries.filter(  e => e.status !== status ))
    // console.log(nodragin)

   const {isDraging,endDraging} = useContext(UiContext)

   const onDropEntry = ( event : DragEvent<HTMLDivElement> ) => {
    
     const id =  event.dataTransfer.getData('text')
    // console.log({id})

    endDraging();


    const Entry = entries.find( e => e._id === id )!;
    Entry.status = status;
    upDateEntry( Entry, false );
   }

   const allowDrop =( event : DragEvent<HTMLDivElement>) => {
           event.preventDefault();
   }

  return (
    // TODO: aqui haremos Drop
    //TODO: DEBEMOS AGRREGAR LA PROPIEDAD SCOLL A NUESTRO PAPER
    <div 
    onDrop={onDropEntry} 
    onDragOver={ allowDrop }
    className={ isDraging  ? styles.dragin : ''}
   
    >
        <Paper  sx={{ height: 'calc(100vh - 180px)' ,  backgroundColor: 'transparent', padding: '5px' }}  >  {/*El paper es una propiedad de MATERIAL UI */}
         {/* TODO: todo cambiara dependiendo si estoy haciendo drag o no */}
           <List  sx={{ opacity: isDraging ? 0.5 : 1, transition: 'all .5s'  }} > {/* Creamos una List Propiedad de Material uI */}


            {// Como la propiedad filter devuelve un arreglo con los elementos pódemos utilizar la propiedad Map para barrer el arreglo
               entryByStatus.map( entry => ( // colocamos parentesis para retornar un objeto
                /* Nuestro componente que creamos en EntryCard para mostrar las Cards */
                <EntryCard key={entry._id} entry={entry} /> // TODO: siempre que utilizemos el MAP debemos utilizar el key en nuestro objeto
                                           // Mandamos el objeto completo con todos los elementos de nuestra entrada.
               ))
  
            }

              
            </List>
        </Paper>
    </div>
  )
}
