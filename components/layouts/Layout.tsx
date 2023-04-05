import { FC } from 'react'

import Head from 'next/head';

import { Box } from '@mui/material'
import { Navbar, Sidebar } from '../ui';


interface Props { // Creamos nuestra functional component que sera nuestro Layout de nuestra pagina, y le pasamos las Props que recibe, el title para el head y los children que renderizara nuestro layout
    title? : string; // tipámos nuestra propiedad
    children? : JSX.Element | JSX.Element[] // para poder recibir children debemos declararlo manualmente en nuestras Props como un JSX.Element o un arreglo de estos si recibiremos mas de un children
}


export const Layout:FC<Props> = ({ title = 'Task - Notes  Lists' , children }) => { // Creamos nuestro Navbar y le pasamos las Props y las desestructuramos, los Props que recibe este compenente si son obligatorias es decir si no tiene la interrogante al finalizar el nombre de la propiedad, donde utilizemos nuestro componenete debemos pasarle esa props 
  return (
    <Box sx={{ flexFlow: 1 }}  > {/* La propiedad SX son elementos propios de css */}
     <Head>
        <title> { title } {/* Aqui recbimos nuestros children y los renderizamos  */} </title>
     </Head>

       <Navbar /> {/* Declamramos e importamos  nuestro Navbar para llamar sus elementos a nuestro Layout */} 
       <Sidebar /> {/* Declaramos e importamos nuesto sidebar para llamar a sus elementos a nuestro layout */}

     <Box sx={{ paddingTop: '10px 20px' }} >
        { children } {/* Aqui renderizamos los children o elementos que recibe nuestro layout */}
     </Box>

    </Box>
  )
}
