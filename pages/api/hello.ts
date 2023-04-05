// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean;
  name: string
}

export default function handler(  req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ // el porpiedad  status  de  Server Response object o abreviado res maneja el estatus que tendra nuestra aplicacion a las respuetas HTTP 
    ok: true, 
    name: 'John Doe' })
}
