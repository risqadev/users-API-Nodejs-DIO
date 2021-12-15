import { Request, Response, Router } from 'express';
import { validate } from 'uuid';
import { createUserController, deleteUserController, findUserById, getUsersController, updateUserController } from '../controllers/user.controllers';
import userRepository from '../repositories/user.repository';
import { StatusCodes } from 'http-status-codes';

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, NO_CONTENT } = StatusCodes;


const usersRoute = Router();

// usersRoute.get('/users', findUserById, getUsersController);
usersRoute.get('/users', async (request: Request, response: Response) => {
  const id = String(request.headers.id);

  const user = await userRepository.findById(id);

  return response.status(OK).json(user);
});

usersRoute.get('/allusers', async (request: Request, response: Response) => {
  const users = await userRepository.findAllUsers();

  return response.status(200).json(users);
});

usersRoute.post('/users', createUserController);

usersRoute.put('/users', updateUserController);

usersRoute.delete('/users', deleteUserController);

export default usersRoute;