import { formatDistanceToNow } from "date-fns";
import { es  } from "date-fns/locale"

// Funcion para comvertir nuestra fecha de que viene como  un numero en tipo date en una fecha con la propiedad formatDistanceToNow de date-fns
export const getFormatDistanceToNow = (date : number) => {
     // Covertimos la fecha que recibimos y la retornamos
     // TODO: PARA CAMBIAR LA EL IDIOMA EN QUE ESTAMOS DEVOLVIENDO LA HORA DE CREACION PASAMOS LA PROPIEDAD LOCALE QUE ES IGUAL A ES : IDIOMA ESPAÑOL
     const fromNow = formatDistanceToNow(date, {locale: es} )

     // TODO: FORMATEAMOS EL DATO FROMNOW PARA ENVIARLE UN MENSAJE CONJUNTO.
     return ` Hace ${fromNow}`;
} 