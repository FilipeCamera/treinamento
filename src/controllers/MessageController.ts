import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Message from '../database/entities/Message';

class MessageController {
  async create(req: Request, res: Response){
    const messages = getRepository(Message);

    const {title, desc} = req.body;

    const id = req.userId;
    const message = messages.create({title, desc, user: {id}})

    await messages.save(message);

    return res.status(200).json(message)
  }
}

const messageController = new MessageController();

export default messageController;