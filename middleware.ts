import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
    export function middleware(req: NextRequest) {


    // TODO: validamos el pathname que estamos recibiendo
    if( req.nextUrl.pathname.startsWith('/api/entries/')){
        const id = req.nextUrl.pathname.replace('/api/entries/', '');
        console.log(id)
        //Expresion regular para validar si el id que recibimos es un id de mongoo
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        if( !checkMongoIDRegExp.test(id) ){ // Si no es un id de mongoo devolvemos un response con un status 400
           const url = req.nextUrl.clone();
           url.pathname = '/api/bad-request';
           url.search = `?message=${id} is not a valid MonId ` // Definimos el mensaje que le queremos pasar a nuestro bad-request
           return NextResponse.rewrite( url );
        }

    }


   
    return NextResponse.next();
}

// See 'Matching Paths' below to learn more

// TODO: como todas nuestras solicitudes al correr nuestra aplicacion pasaran primero por nuestro middleware le decimos que haremos MATCH solo con una especifica
 export const config = { // Configuramos nuestra el Match que haremos con la ruta de nuestra Api
//    matcher: '/about/:path*',

  // Definimos nuestro matcher con la ruta de  nuestra Api y si queremos definir mas de un path solo abrimos un arrgelo y pasamos los path que necesitamos
  // TODO: IMPORTANT DEFINIR CORRECTAMENTE LA RUTA DE NUESTRO PATH
  matcher: '/api/entries/:path'


}