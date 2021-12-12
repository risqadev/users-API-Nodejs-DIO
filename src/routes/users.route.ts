import { Request, Response, Router } from 'express';
import { createUserController, deleteUserController, findUserById, getUsersController, updateUserController } from '../controllers/user.controllers';
import userRepository from '../repositories/user.repository';


const usersRoute = Router();

usersRoute.get('/users', findUserById, getUsersController);

usersRoute.get('/allusers', async (request: Request, response: Response) => {
  const users = await userRepository.findAllUsers();

  return response.status(200).json(users);
});

usersRoute.post('/users', createUserController);

usersRoute.put('/users', findUserById, updateUserController);

usersRoute.delete('/users', findUserById, deleteUserController);

export default usersRoute;