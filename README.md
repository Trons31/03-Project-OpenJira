* Instalaciones para nuestro proyecto de next
* Material Ui, la  grid Material Ui es first mobile, CODE INSTALLATION: __yarn add @mui/material @emotion/react @emotion/styled ___ 
* IconsMaterial, para nuestros iconos de material, CODE INSTALLATION : __yarn add @mui/icons-material__
* mongoose para la base de datos, CODE INSTALLATION __yarn add mongoose__
* Para el manejo de fechas : CODE INSTALLATION __yarn add date-fns__


PARA UTILIZAR DOCKER DEBEMOS CREAR EN LA RAIZ DE NUESTRA APLICACION UN ARCHIVO QUE SE LLAME : docker-compose.yaml, ESTE ARCHIVO DEBE RESPECTAR LA SINTAXIS PARECIDA A UN ARCHIVO JSON, con los espacios 

## IMPORTANT 
* la fuente que importamos de Material Ui debemos ponerla o nos recomiendan ponerla en el head de nuestro ___ _document.tsx__ y debemos crearlo con el snippet de nextdocument

## REACT
* los componentes de react siempre van con la primera letra en mayuscula los .tsx 

## NEXT
* Las paginas de next las tenemos que importar por defecto  o con el snippet de : RAFCE nos crea el codigo, y al nombre le damos la notacion al final Page : NombrePage

# Next.Js  Entries OpenJira
para correr localmente se necesita la base de datos
```
docker-compose up -d         ___COMANDO QUE EJECUTAREMOS EN LA CONSOLA PARA EJECUTAR NUESTRO ARCHIVO DOCKER TENEMOS QUE TENER EN CUENTA QUE DOCKER DESKTOP DEBE ESTAR CORRIENDO PARA QUE FUNCIONE __
```
```
Si BORRAMOS NUESTRO CONTENEDOR POR ERROR EN DOCKER SOLO DEBEMOS VOLVER A EJECUTAR : docker-compose up -d , Y DOCKER LEVANTARA LA IMAGEN Y TODA LA IMFORMACION ESTARA INTACTA PORQUE SE GUARDA EN LA CARPETA QUE TENEMOS EN LA RAIZ DE NUESTR APLICACION QUE SE LLAMA MONGO

IMPORTANTE SI BORRAMOS LA CARPETA MONGO LITERALMENTE BORRAMOS NUESTRA BASE DE DATOSS
```

* El -d, significa __detached__  es decir que no se ejecutara en la consola


# docker compose.yaml code with comments to understand the features of the file

#code of copy

ARCHIVO docker-compose.yaml
* EN UN ARCHIVO YAML LOS ESPACIOS SON MUY IMPORTANTES*/
* services :
  * entriesdb:  /* Creamos un servicio */ /* Respetamos los espacios haciendo tab desde el comienzo de la linea  */
     * image: mongo:5.0.0 /* Creamos una imagen de la version que deseamos crear de mongo */
     * container_name: entries-database /* Creamos un contenendor  y el nombre que le pongamos sera el nombre que aparezca en docker desktop   */
     * ports: Exponemos los puertos para hacer pruebas con nuestra base de datos */
     *  '-' 27017:27017  27017 puerto por defecto de mongo */
     * volumes:
     * '-' ./mongo:/data/db  /* Para la imformacion en nuestro db creamos un volumen y mapeamos la carpeta que se crea cuando ejecutamos el docker en nuestro terminal 


* Una vez ejecutado docker compose en la terminal la carpeta mongo aparecera en la raiz de nuestra aplicacion, pero todo esto no debe estar expuesto al subir la aplicacion a nuestro repositorio es por ello que en nuestro archivo de .gitignore debemos exponer el directorio

```
Para conectarnos a MongoDbCompass : mongodb://localhost:27017/entriesdb 
 ```

*   ___ConectDb__
Creamos una carpeta que se llame database, creamos el archivo barril nuestro index, PARA TRABAJAR CON NUESTRA BASE DE DATOS DEBEMOS INSTALAR MONGOOSE : para que nos ayude a trabajar con nuestra base de datos de forma facil -- Creamos un archivo que se llame db y dentro nos conectamos a la base de datos

* instalar mongose ___IntallMongoose__ correr el siguiente codigo en la terminal : ___yarn add mongoose__

```
Variables de entorno para conectarnos a la base de datos
```

* Creamos un archivo en la raiz de nuestra aplicacion que se llame .env y definimos nuestras variables de entorno ___Important__ : ignorar las varibales de entorno ya que contienen imformacion muy importante y queremos que no queden expuestas, lo hacemos en nuetro gitinore

## Configurar variables de entorno
* Cuando creamos un archivo de varibales de entorno como buenas practicas de next hacemos capy past y lo podemos renombrar env.template y solo dejamos nuestras variables definidas pero no llenas para el uso de otro programador


```
Shcemas for Database Mongoose

```
*Cremas una carpta en la raiz de nuestra aplicacion llamada MODELS, creamos nuestro archivo de barril index, y cremos nuestros esquemas


## Insert Database

* para insertar las entradas en nuestra base de datos, en nuestra carpeta database que esta en la raiz de nuestra aplicacion, creamos un archivo que se llama seed-data y hay creamos el objeto que insertara nuestras entradas a la base de datos

* Una vez crado el objeto que insertara nuestras entradas, vamos a nuestro Enpoint /Pages/Api/seed  y justo entre la propiedad conect y disconect en ese espacio podemos hacaer cualquier interaccion con nuestra base de datos, y hay le pasamos el siguiente codigo :  await Entry.insertMany( seedData.entries );  dentro del insert va el objeto que hace referencia a nuestras entradas

## Run client or Server ?

* Para saber que cosas se ejecutan del lado del cliente o del servidor, debemos analizar quien llama estos archivos, todo lo que se llame en pages on components se llama eventualmente del lado del cliente, si lo llamamos de API a los archivos que tengan guion bajo como __app  o lo que ejecutemos en ServerSideProps, o StaticProps

## Mongo compass
* para actualizar nuestro mongo compass hacemos : Crtl + r y podemos ver la actualizacio de nuestras inserciones


# LLenar base de datos
```
http://localhost:3000/api/seed  endpoints para llenar base de datos


```

## create endpoints to fill database

* Creamos una carpeta en nuestro API de PAGES se llamara entries


## Leer entradas que estan alojadas en el back-end, desde el front-end
* trabajaremos con exios para hacer nuestras peticiones HTTP.
```
instalar axios : yarn add axios
``` 


# Creamos un nuevo directorio para APIS para realizar peticiones 
* nombre de la carpeta  ___apis__


## Insertar y leer entradas a nuestra base de datos con nuestro API
* En nuestro PAGES/API creamos una carpeta llamada entries y colocamos un index, y creamos las funciones que ingresara y obtendran la imformacion de nuestra base de datos


## Insertar entrada desde el front-end
* Nos dirigimos a nuestro entries provider modificamos la forma en como insertamos nuestro registro porque ya no le corresponde al front-end hacerlo, 


## GET : LEER O OBTENER || POST : INGRESAR O INSERTAR || PUT: ACTUALIZAR
 * Para actualizar nuestra imformacion manejaremos las paginas que tiene argumentos por URL o rutas dinamicas para obtener todos nuestros ID a partir de una ruta dinamica 

 ## Rutas con argumentos dinamicos
 
 ```
 Para crear rutas dinamicas solo debemos crear nuestro archivo y colocamos [nombre] corchetes y el nombre para identificar el valor que estaremos recibiendo por nuestra ruta
 ```

* para crear nuestra ruta con argumentos dinamicos creamos un [id] en nuestro entry para recibir los id y hacemos un NextApi,  en POSTMAN si hacemos un send con nuestra api y un id en espefico para llamar hacemos lo siguiente : http://localhost:3000/api/entries/id , 

## Llamar endpoint de actualizar del lado del front-end
* una vez lista nuestra ruta dinamica con nuestro endpoint de actualizar la imformacion, es momento de utilizarlo en nuestro front-end para este propyecto lo utilizaremos en nuestro EntrieProvider que es donde hacemos el dispacth para actualizar nuestra Entry



# MIDDLEWARES

## MIDDLEWARES PARA HACER VALIDACIONES ANTES DE QUE SE EJECUTE UNA RUTA
* El middleware le permite ejecutar código antes de que se complete una solicitud, luego, en función de la solicitud entrante, puede modificar la respuesta reescribiendo, redirigiendo, agregando encabezados o configurando cookies

```
Creamos un archivo middleware.ts o js si estamos en javaScript, un archivo en el mismo nivel que nuestro pages directorio en este caso lo haremos en la raiz de nuestra aplicacion y exportamos la funcion middleware
```
* Creamos nuestra funcion middleware y ahora todo las solicitudes que se ejecuten al correr nuestra aplicacion pasaran primero por nuestros middleware por ese debemos especificar la ruta especifica con que queremos que haga Mathc

* En nuestra carpeta de API nos creamos un endpoint Llamado Bad-Request para manejar nuestros bad-request


# Server side Props
## Comunicar nuestro back-end con el front-end
* tomaremos nuestro front-end y lo comunicaremos con nuestro back-end para intercambiar imformacion
```
El back-end le manda la aplicacion al cliente = al fron-end y el back-end corre en el servidor ' funciones , base de datos etc'
Haremos que cuando el cliente haga un request, nosotros de antemano podemos saber que informacion es la que cliente necesita y haremos que back-end le mande la imformacion preprocesada y se carguen menos datos

```` 

# Creamos una carpeta entry en nuestro pages con una ruta dinamica llamada id

## Server side Rendering
* Utilizaremos server side rendering para manejar la imformacion de nuestra ruta dinamica [id] de entries,y de esta forma traer nuestra pagina precargada con imformacion del lado del servidor
* Accedemos a nuestro archivo y declaramos el Server side Props con el snippet de react : NextSSRProps

```
Lo que nuestro server side props retorna es enivado al componente en el cual estamos invocandolo y podremos tener acceso a la imformacion que llamemos en nuestro SSR desde el servidor, para recibir la imformacion en nuestro componente debemos decir que este sera de tipo FC y luego recibimos las props como  parametro y tenemos acceso a todo lo que es mandado de las props
```

## Navegaciones UseRouter
* Para hacer navegaciones a otras paginas lo podemos hacer con nuestro router y la propiedad push aunque existen varios como prefecth o replace
* Si queremos mandar un id a la direccion de nuestra ruta lo hacemos con la propiedad push: router.push(`/ruta/${variable con id}`), utilizaremos bacstis para ingresar constantes con valores a la navegacion : ` Formatear valor ` 

```
Importante useRouter lo utilizaremos en la pagina de donde mandaremos el id en este caso hacia el directorio que recibe la ruta dinamica: Desde nuestra card donde tenemos todas la data de las entradas y donde utilizaremos el onClick para cuando cliken la carta llamamos a la funcion que tendra el router de navegacion dinamico hacia nuestra ruta dinamica.
```