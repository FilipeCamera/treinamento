import {Request, Response} from 'express';

import {getRepository} from 'typeorm';
import User from '../database/entities/User';

export default class UserController{
  async create(req: Request, res: Response){
    const {name, email, senha} = req.body;

    const user = await getRepository(User);

    const verifiedEmail = user.findOne({where: email})

    if(verifiedEmail){
      return res.status(400).json({message: 'Email existente'})
    }

    const created = user.create({name, email, senha});

    await user.save(created);

    return res.status(200).json(created);
  }
}