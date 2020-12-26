import {Request, Response, NextFunction} from 'express';

import jwt from 'jsonwebtoken';

interface DataPayloads {
  id: string;
  iat: number;
  exp: number;
}

export default function Autenticado(req: Request, res: Response, next: NextFunction){
  try{
    const {authorization} = req.headers;

    if(!authorization){
      return res.status(400).json({message: 'Usuário não autenticado'})
    }

    const token = authorization.replace('Bearer', '').trim();

    const data = jwt.verify(token, 'teste');

    const { id } = data as DataPayloads;

    req.userId = id;

    return next();
  } catch(err) {
    return res.json(err)
  }
}