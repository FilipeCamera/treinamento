import express from 'express';
import messageController from './controllers/MessageController';
import userController from './controllers/UserController';
import Autenticado from './middlewares';

const routes = express.Router();

routes.get('/', (req, res) =>{
  return res.json({message: 'Olá'})
})

routes.post('/users/create', userController.create)

routes.post('/login', userController.login)

routes.post('/message/create', Autenticado, messageController.create)

export default routes;