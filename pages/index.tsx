import type { NextPage } from 'next'

import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

import { Layout } from '../components/layouts'
import { EntryListItem } from '../components/ui/EntryListItem'
import { NewEntry } from '../components/ui'
import { useContext } from 'react';

const HomePage: NextPage = () => {
    // TODO: varibale de entorno 
   //console.log(process.env.NEXT_PUBLIC_CLIENTE);

  return (
      <Layout title='List-Task DR' >
        <Grid container spacing={2} sx={{ paddingTop: '12px', padding: 2 }}   > { /* La Grid crea coherencia visual entre los diseños al tiempo que permite flexibilidad en una amplia variedad de diseños. La interfaz de usuario receptiva de Material Design se basa en un diseño de cuadrícula de 12 columnas. Hay cinco puntos de interrupción de cuadrícula: xs, sm, md, lg y xl. cada uno a un tamaño de pantalla correspondiente  */}
              {/* Los accesorios rowSpacingy columnSpacing permiten especificar los espacios entre filas y columnas de forma independiente.  */}


        <Grid item md={4} xs={12}  >
            <Card className='Pending' sx={{ height: 'calc(100vh - 100px)' }}  > {/* Utilizamos una propiedad Card de material Ui    || Utilizamos sx que  es un extends styles de css y la pasamos los estilos especificados para que nuestra carte ocupe el tamaño de nuestra pantalla restandole el espacio del navbar  */}
               <CardHeader sx={{ textAlign: 'center'  }} title="Pendientes" /> {/* Propiead de MATERIAL que es el titulo de la cabecera de nuestra Card que se puede auto cerrar */}

               <NewEntry />
               {/* Listado de Entradas */}
              <EntryListItem  status='Pending' /> {/* Nuestro componente  importado de componenets, ui, para mostrar el listado de entradas */}
             

            </Card>
        </Grid>      
        <Grid item md={4}  xs={12} >
            <Card className='In-Progress' sx={{ height: 'calc(100vh - 100px)' }} > {/* Utilizamos una propiedad Card de material Ui */}
               <CardHeader sx={{ textAlign: 'center'  }} title="En Progreso" /> {/* Propiead de MATERIAL que es el titulo de la cabecera de nuestra Card que se puede auto cerrar */}

                            {/* Listado de Entradas */}
              <EntryListItem status='in-progress' /> {/* Nuestro componente  importado de componenets, ui, para mostrar el listado de entradas */}
              
           
            </Card>
        </Grid>     
        <Grid item md={4} xs={12} >
            <Card className='Finished' sx={{ height: 'calc(100vh - 100px)' }} > {/* Utilizamos una propiedad Card de material Ui */}
               <CardHeader sx={{ textAlign: 'center'  }} title="Completado" /> {/* Propiead de MATERIAL que es el titulo de la cabecera de nuestra Card que se puede auto cerrar */}

                             {/* Listado de Entradas */}
              <EntryListItem status='Finished' /> {/* Nuestro componente  importado de componenets, ui, para mostrar el listado de entradas */}
              
             
            </Card>
        </Grid>     


        </Grid>
      </Layout>
  )
}

export default HomePage
