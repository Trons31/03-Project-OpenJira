import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean;
    message: string | string[];
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    // TODO: Para utilizar nuestro bad-request en diferentes endpoints y que la response sea deacuerdo a res que mandamos del endpoint recibiremos agrumentos, reutilizamos nuestro endponit
    
    // Creamos un argumento que recibiremos de nuestro URL si no viene sera igual al string que le asignamos 
    const {message = 'bad-request'} =  req.query;

    res.status(400).json({ 
        ok: false,
        message
     });

}
