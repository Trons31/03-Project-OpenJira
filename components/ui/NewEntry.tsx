import { Box, Button, IconButton, List, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useState, useContext } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UiContext } from '../../context/ui/UiContext';

export const NewEntry = () => {

  // TODO: utilizamos nuestro contexto de ENTRIESCONTEXT para llamar el metodo que agregara nuestra nueva entrada
  const { addNewEntry,entries } = useContext(EntriesContext);

     // TODO: Con este useState vamos a manejar lo que nosotros deseamos que se vizualize deacuerdo al valor del estado false; o true
   //const [isAdding, setisAdding] = useState(false); // TODO: Devuelve un valor con estado el valor en este caso es :isAdding y su valor es false declarado en el use state  y una función para actualizarlo que en este caso es : setisAdding y que cada vez que lo llamemos cambiara el valor de false a true;
  
   const { isAddinEntry,setisAddinEntry } = useContext(UiContext);
    
    const [InputValue, setInputValue] = useState('') // Creamos un useState para manejar el estado del valor que tiene el input
    const [touched, settouched] = useState(false) //Creamos un useState para validar que nuestro campo no quede vacio y mostraremos un mensaje de error

    // TODO: Cuando utilizamos la propiedad de estado inicial que es nuestra propiedad que no tiene set en el nombre y esta propiedad de que tiene el estado de valro incial la utilizamos en una condicion  solo se ejecutara si su valor inicial es true o si cumple con otro tipo de valor


    const onTextFieldChanged  = ( event : ChangeEvent<HTMLInputElement> ) => { // Creamos una constante para que cuando se ingresen valores en nuestro input se dispare el evento.
          setInputValue( event.target.value );
    }
 
   

    const onSave = () => { // Creamos una constante para guardar lo que se ingrese en nuestra entrada 
                  // Cuando creamos funciones de flechas normalmente es porque recibiremos parametros
 
      if ( InputValue.length === 0  ) return; // Condcion paa evaluar si nuestro campo esta vacion si no tiene valores, entonces no ejecutamos el codigo que sigue o lo sacamos inmediatamente de nuestra funcion
                     // TODO: LA PROPIEDAD LENGTH Devuelve la longitud de un objeto String. 
      //console.log(InputValue  );    
      
    const entryByDescription = ( entries.filter( entry => entry.description === InputValue ).length ) // TODO: con esta clausula nos devolvera una lista de tipo number que se almacenara en nuesta constante, esto seria igual a un where en esta caso llamamos a la funcion filter. 
                                                // entry propiedad de entries, realmente podemos crear cualquier propiedad aqui para señalarla y tener aceeso a las propiedades de nuestra entries
                                                // TODO: debemos colocar LENGTH al final de la clausula para que nos devuelva una coleccion de numeros
     //console.log(entryByDescription)

    if ( entryByDescription !== 0  )  return;  
    // Condicion si lo que almacena entryByDescription en diferente de cero

   
       // TODO: utilizamos el metodo que agregara nuestra nueva entrada y le pasamos los valores que guarda nuestro INPUTVALUE
      addNewEntry( InputValue );
      setisAddinEntry( false );
      settouched( false );
      setInputValue('');
    }
    


  return (
    <Box sx={{ marginBottom: 2 ,paddingX:2  }}>

     
     {// Renderizamos la imformacion que deseamos que se vizualiza de acuerdo al estado de nuestro useState 
          
          isAddinEntry  // IsAdding tiene el valor de false, entonces una forma muy practica de hacer una condicion es llamar a is Adding que tiene el valor de false y debajo colocamos ? para validar si su valor es true y abrimos párentesis para decir que devolvemos un JSX.Element y abrimos y cerramos fragmentos <></> de lo contrario utilizamos " : " para decir si es false y abrimos parantesis para devolver un objeto
          ? (
              <>
                     
                  <TextField /* TODO: Propiedad de Material Ui que nos proporciona un campo de texto */
                  label='Nueva Entrada' // TODO: Con el label podemos mostrar la descripcion de nuestro campo o TextField
                  fullWidth // TODO: el fullWidht hace que nuestro TextField ocupe todo el espacio donde se encuentra
                  autoFocus
                  multiline //Propiedad para poder coloar varias lineas de texto o hacer saltos de lineas en nuestro TextField
                  placeholder='Nueva Entrada'
                  helperText={InputValue.length <= 0 && touched && ' Ingrese un valor'} // Contenido de ayuda o lo podemos implementar para cuadno tengamos un valor no correspondiente a nuestro campo
                  error={ InputValue.length <= 0 && touched } //Propiedad de MaterialUi que nos ofrece el estilo de tipo error para nuestro campo, nosotros debemos evaluar la condicion que queremos, para que el error aparezca
                  value={ InputValue } // Recibimos el valor inicial de nuestro de estado en este caso un string vacio.
                  onChange={onTextFieldChanged}
                  onBlur={ () => settouched(true)} // Propiedad de MaterialUi que nos dice cuando se pierde el foco del input. si esto sucede entonces camabiamos el estado de touched, llamando la propieda settocuched para que la condicion que esta dentro de nuestra propiedad error se cumpla y se muestre el error
                  > 
                    
                  </TextField>
                  
                  
                  <Box padding={1} display='flex' justifyContent='space-between' > {/* La propiedad Box de MATERIAL UI nos ofrece proiedades que podemos aprovechar, el estilo space-between nos sirve para crear un espacio entre los elementos que esten dentro de nuestro box  */}
                    <Button 
                    variant="text"
                    color="primary"

                    // TODO: Para llamar varias funciones en un evento de OnClik despues de hacer la funcion de flecha debemos abrir llaves y podremos llamar todas las funciones que querramos
                    onClick={ () => setisAddinEntry( false )  }  // TODO: para cambiar el estado del useState delcaro el llamado a una funcion "  () =>   "  y llamo setisAddin y le paso el nuevo valor, de esta forma con la propiedad onClick cada vez que demos click aqui se mostrara lo que esta en la condicion que valida si el state es false
                    >
                      <CancelIcon />  { /*Icono importado desde Material Ui, utilizado el como nombre como un componente normal */ }
                    </Button>

                    <Button 
                    variant="outlined"
                    color="secondary"
                    // endIcon={ <CheckIcon/>  } // Esta propieda nos sirve para agregar un icono al final del boton, solo colocamos el icono como si fuera un componenete normal
                    // TODO: Para llamar varias funciones en un evento de OnClik despues de hacer la funcion de flecha debemos abrir llaves y podremos llamar todas las funciones que querramos
                    onClick={ onSave } // TODO: Propiedad de Matrial Ui que se ejecuta cuando hacemos click en este caso el boton,  esta propieda ejecuta una funcion normalmente
                    >
                        <SaveIcon /> { /*Icono importado desde Material Ui, utilizado el como nombre como un componente normal */ }
                    </Button>
                

                    </Box>
                 
              </>

            ) 
            
            : (
                <Button
                  startIcon={ <AddIcon/> } // Esta propiedad nos sirve para agregar un icono en el inicion del boton o antes del contenido que coloquemos dentro de el, es decir dentro del boton primero aparecera el icono y despues el contenido que agregamos dentro de el.
                  variant="outlined" // TODO:  La variante nos ofrece ciertos estilos especificos para nuestro button
                  fullWidth // TODO: el fullWidht hace que nuestro Button ocupe todo el espacio donde se encuentra
                   // TODO: Para llamar varias funciones en un evento de OnClik despues de hacer la funcion de flecha debemos abrir llaves y podremos llamar todas las funciones que querramos
                  onClick={() => setisAddinEntry( true ) } // TODO: para cambiar el estado del useState delcaro el llamado a una funcion "  () =>   "  y llamo setisAddin y le paso el nuevo valor, de esta forma con la propiedad onClick cada vez que demos click aqui se mostrara lo que esta en la condicion que valida si el state es true
                  sx={{ marginBottom:2 }}
                  >
                  
                  Agregar entrada
                </Button>

            )

     }
     </Box>

  )
}
