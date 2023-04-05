import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';


import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "../../components/layouts";
import { EntrieState, Entry } from "../../interfaces";
import { dbEntry } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { DateFunction } from '../../utils';

const validStatus:EntrieState[] = ['Pending','in-progress' ,'Finished']; // Creamos un arreglo para mapear los radio buttons que vamos a mostrar y le diremos que es de tipo EntrieState que tiene nuestros status para generar un tipado mas alto
                                                    
interface Props { //TODO: COMO ESTAS PROPS SON LAS  QUE LE ESTAMOS PASANDO A NUESTRO FC AQUI CAERAN TODAS LAS PROPS ENVIADAS DESDE LAS PROPS DE NUESTRO SSR DEL LADO DEL SERVIDOR
   // TODO:
  entry : Entry // Recibimos la entry que nos manda las props de nuestro SSR que vienen del servidor y le decimos que sera de tipo ENTRY de nuestras interfaces
   // TODO:
}

export const Entryview:FC<Props> = ( { entry } ) => {

  //console.log(props)
   
  // TODO: Utilizamos el useContext para acceder a la funcion updateEntry de nuestro Context;

   const { upDateEntry,deleEntry } = useContext(EntriesContext);

   // LLamamos a nuestra de reacr useState que Devuelve un valor : inputValue con estado: ' string vacio ' y una función para actualizarlo : setInputValue para manejar la imfomracion de nuestros formularios
   const [inputValue, setinputValue] = useState(entry.description);
   // Definimos un useState para manejar la imformacion de nuestros estados  y lo tipamos con nuestra interface EntrieState que tiene todos los estados
   const [status, setStatus] = useState<EntrieState>(entry.status)
   // Definimos un useState para saber cuando han tocado nuestro formulario. le pasamos el primer valor en false
   const [touchInput, setTouchInput] = useState(false)
   // Definimos un useRouter para navegar a otra pagina y lo asignamos a nuestra constante para accerder a las propiedades que nos ofrece
   const router = useRouter();


   // TODO: IMPORTANT para optimizar mejor nuestro codigo como tenemos una condicion que se repite varias veces podemos memorizarla .
   const isNotValid = useMemo(() => inputValue.length <= 0 && touchInput, [inputValue, touchInput]) // La funcion useMemo primero pide el proceso que va hacer para devolver el valor y depues las dependencias que esta necesita


   // Creamos una funcion para modificar el valor de nuestro  state INPUT para asignarle el valor que ingresemos en nuestro TextField
   const onTextFieldChanged =  ( event: ChangeEvent<HTMLInputElement> ) => {   
    // TODO: IMPORTANT
    setinputValue(event.target.value);  // TODO: HACEMOS EL SET A NUESTRO STATE PARA ACTUALIZAR LA IMFORMACION CON LA QUE INGRESAMOS EN NUESTRO INPUT
   // TODO: IMPORTANT
  
  }


  const onChangeRadio  = (event: ChangeEvent<HTMLInputElement>) =>{
    
    //console.log(event.target.value)
    
    // TODO: IMPORTANT
    setStatus(event.target.value as EntrieState ) // PARA QUE LA ACTUALIZACION DE ESTE STATUS NOS NO DE ERROR DEBEMOS DECIRLE QUE NUESTRO EVENT TARGET VALUE LUCE COMO UN ENTRYSTATUS DE NUESTRA INTERFACE PARA ESO DEBEMOS COLCAR : as EntrieState
    // TODO: IMPORNTANT
  } 


  // TODO: FUNCION PARA Actualizar  LA IMFORMACION DE NUESTRO de nuestra entrada utilizando la funcion de nuestro context;
  const Onsave = () => {
   if( inputValue === '' ) return; // VALIDAMOS QUE NUESTRO INPUT TENGA UN VALOR, DE LO CONTRARIO LO SACAMOS DE NUESTRA FUNCION CON UN RETURN

   
   // TODO: CREAMOS UNA CONSTANTE DE TIPO ENTRY Y DESESTRUCTURAMOS LA ENTRADA Y LE PASAMOS LOS VALORES DE NUESTROS USESTATE, EL USESTATE DEL STATUS QUE ALMACENA EL STATUS Y EL USESTATE INPUTVALUE QUE ALMACENA LA DESCRIPCION PROPIEDADES QUE RECIBIRA LA FUNCION UPDATEENTRY DEL CONTEXTENTRIES
   const updateEntry: Entry =  {
      ...entry,
      status,
      description : inputValue,
   }

   //TODO: ESTA FUNCION UPDATEENTRY RECIBE ALGO DE TIPO DATOS DE TIPO ENTRY ENTONCES LE PASAMOS NUESTRA CONSTANTE updateEntry de tipo Entry desustructuramos la entrada para acceder al status y a la descripcion
   upDateEntry(updateEntry,true); //¡Le pasamos la constante que tiene los valores para actualizar de nuestra entrada

   router.push("/")

  }

  const deleteEntry = () => {

    const idEntry: Entry = {
      ...entry,
     // _id:  ,
    }
 
    //deleEntry(deleteEntry);

  }


  
  return (
    <Layout title="......." >
       <Grid
       container
       justifyContent='center'
       sx={{ marginTop: 2 }}
       >
        <Grid item xs={ 12 }  sm={8} md={ 6 } >

            <Card>
                <CardHeader  // TODO: el header es una propiedad de material Ui que se autocierra y reibe el valor en la propiedad titile, podremos ingresamos el titulo que deseamos
                // TODO: IMPORTANT
                title={`Entrada: ${ inputValue }`} // TODO: podemos renderizar el valor de nuestro inputvalue y mostrar todo lo que estemos ingresando en nuetro input colocamos bactis o ` y renderizamos con  ${ state } `
                //TODO: IMPORTANT
                                               //TODO: FORMATEAMOS LA FUNCION QUE CONVIERTE NUESTRA FECHA Y LE PASAMOS LA FECHA QUE VIENE DE LA ENTRY
                subheader={` Creada hace ..... ${ DateFunction.getFormatDistanceToNow(entry.createDate) }`} // el suheader funciona igual que nuestro title si deseamos ingresar algo para vizualizar como subTitle lo ingresamos
                />

            <CardContent>
                 <TextField
                 sx={{ marginTop: 2, marginBottom: 2 }}
                 fullWidth //   Propiedad para ocupar todo el ancho donde del padre
                 placeholder="Nueva entrada"
                 autoFocus 
                 label= 'Nueva Entrada' // Label para mostrar descripcion de nuestro campo
                 multiline  //Propiedad para poder coloar varias lineas de texto o hacer saltos de lineas en nuestro TextField

                 value={inputValue} // TODO: el valor de nuestro input le pasamos nuestro state inputValue que tiene un string vacio
                 onChange={ onTextFieldChanged } // TODO: Propiedad que definimos para saber cuando el valor de nuestro input a cambiado y dentro de esta funcion hacemos el set a nuestro status para asignarle la imformacion que hemos ingresao
                 
                 // TODO: IMPORTANT 
                 // la constante isNotValid es una condicion memorizada para optimizar nuestro codigo 
                 error={ isNotValid  } ////Propiedad de MaterialUi que nos ofrece el estilo de tipo error para nuestro campo, nosotros debemos evaluar la condicion que queremos, para que el error aparezca
                 helperText={ isNotValid ? 'Ingrese algo' :'' } // Contenido de ayuda o lo podemos implementar para cuadno tengamos un valor no correspondiente a nuestro campo SE MOSTRARA CUANDO SE CUMPLA LA CONDICION DESCRITA.
                 // TODO: IMPORTANT 
                 
                 // TODO: IMPORTANT
                 onBlur={ () => setTouchInput(true) } // OnBluer propiedad de Material UI que que nos sirve para saber cuando se pierde el focus de nuestro campo
                 // TODO: IMPORTANT
                >
                  
                 </TextField> 

               
               <FormControl>
                <FormLabel> Estado :</FormLabel>
                <RadioGroup
                row // TODO: propíedad para disponer que todo nuestro elementos que se encuentren aqui se vean como una fila o uno al lado de otro y no uno debajo de otro


                value={status} // TODO: En nuestro radio Grup le asignamos el valor inicial de nuestro state: STATUS que es Pending
                onChange={onChangeRadio} // TODO: Propiedad que definimos para saber cuando el valor de nuestro state: STATUS a cambiado y dentro de esta funcion hacemos el set a nuestro status para asignarle la imformacion que hemos ingresao

                >
                    { 
                      validStatus.map( option => ( // Recorremos nuestro arreglo con la propiedad Map y le pasamos la propiedad  FormControlLabel de material Ui le pasamos la key que sera igual a nuestro option el value, el control, y el label
                        <FormControlLabel
                         key={option}
                         value={ option }
                         control={ <Radio /> }
                         // TODO: para capitalizar nuestro label o que nuestro primera letra este en mayuscula Material Ui nos expone la propiedad capitalize para que la utilizemos 
                         label={option}
                        />
                      ) )
                    }
                </RadioGroup>
               </FormControl>

            </CardContent>

            <CardActions> {/* El cardActions es para agregar en el footer nuestras acciones o botones como guardar, eliminar  */}
                <Button 
                //startIcon={ <SaveOutlinedIcon/> } Propiedad para colocar icono al inicio de nuestro boton
                //endIcon={<SaveOutlinedIcon/>} Propiedad para colocar icono al final de nuestro boton 
                variant="contained" // TODO: pademos cambiar el estilo de nuestro boton
                fullWidth
                onClick={ Onsave  }

                // TODO: IMPORTANT
                disabled={ inputValue.length <= 0 } // Propiedad para desabilitar nuestro boton, en el cual crearemos una condicion para poder habilitarlo
                // TODO: IMPORTANT

                
                >
                    <SaveOutlinedIcon />
                </Button>
            </CardActions>


            </Card>

        </Grid>
       </Grid>

       <IconButton
       // TODO:  la propieda sx nos sirve para agregar estilos CSS adicionales.
       sx={{ // TODO: desde nuestro sx podemos accerder al theme de Material y utilizar nuestras definiciones de colores
        position: 'fixed',
        bottom: 50,
        right: 40,
        backgroundColor: 'error.dark'
    }}
    onClick={ deleteEntry }
       >

        <DeleteOutlineOutlinedIcon       
        />
       </IconButton>

    </Layout>
  )
}


// TODO: IMPORTANT
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// TODO: IMPORTANT

// Cuando un usuario haga una solicitud de esta pagina el servidor de NEXT siempre genera esta pagina del lado del servidor

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
                                                            // TODO: utilizaremos el context o ctx ya que este nos ofrece mucha imformacion
// TODO: TODO ESTO CORRE DEL LADO DEL SERVIDOR

//console.log(ctx.params) // llamamos a la propiedad params ya que esta nos proporciona mucha imformacion de la Request
// TODO: Con el params obtenemos el id de nuestra ruta dinamica del lado del servidor

//TODO: Desestructuramos el id que viene de nuestros params del ctx y para que no nos de error le decimos que ese id lucira como un string de la siguiente forma : as { id : string } 
const { id } = params  as { id : string };


//TODO: Creamos una constante para asignarle la data, Llamamos nuestra funcion que obtendra la data por el id obtenido del servidor: FUNCION QUE CREAMOS EN NUESTRO DIRECTORIO DATABASE FILE DBENTRIES
const entry = await  dbEntry.dbEntryforID(id);



 // Evaluamos si el id que recibimos por nuestro ruta que estamos obteniedo del lado del servidor es un Id mongoo valido, y como parametro le pasamos el id, esta propiedad devolvera true o false si el id es valido
 if( !entry ){ // TODO: SI EL ID QUE RECIBIMOS NO ES VALIDO POR LOGICA NO DEVEMOS RENDERIZAR NUESTRO COMPONENTE ENTONCES LO SACAMOS DE LA PAGINA DESDE EL LADO DEL SERVIDOR
      return {
        redirect :{ // Propiedad para redireccionar a otra pagina
          destination : '/', // TODO: el destination el la pagina donde mandaremos al usuario
          permanent: false, // Le decimos que el permanent sera false ya que esta pagina si seguira existiendo para proximas solicitudes
        }
      }
 }
 

  return { // TODO: LAS PROPS QUE RETORNA NUESTRO SERVER SIDE PROPS SON ENVIADAS A NUESTRO COMPONENTE EN ESTA COSA A EntryView o al componenete en que estemos llamando el Server side Props
    props: { // TODO: TODO lo que enviemos aqui en estas props caera en las props que le tipemos al FC de esta pagina y podremos acceder a ellas
      entry 
    }
  }
}

export default Entryview;