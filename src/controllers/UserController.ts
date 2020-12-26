import {Request, Response} from 'express';

import {getRepository} from 'typeorm';
import User from '../database/entities/User';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

class UserController{
  async create(req: Request, res: Response){
    const {name, email, senha} = req.body;

    const user = getRepository(User);

    const verifiedEmail = await user.findOne({where: {email}})

    if(verifiedEmail){
      return res.status(400).json({message: 'Email existente'})
    }

    const created = user.create({name, email, senha});

    await user.save(created);

    return res.status(200).json(created);
  }
  async login(req: Request, res: Response){
    const {email, senha} = req.body;

    const users = getRepository(User);

    const user = await users.findOne({where: {email}})

    if(!user){
      return res.status(400).json({message: 'Usuário n cadastrado'})
    }

    const correctSenha = await bcrypt.compare(senha, user.senha)

    if(correctSenha != true){
      return res.status(400).json({message: 'Senha incorreta'})
    }

    const token = jwt.sign({id: user.id}, 'teste', {expiresIn: '1d'})

    return res.json({token: token});
  }
}

const userController = new UserController();

export default userController;