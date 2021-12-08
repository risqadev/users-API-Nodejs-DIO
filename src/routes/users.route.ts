import { Router } from 'express';
import { createUserController, deleteUserController, findUserById, getUsersController, updateUserController } from '../controllers/user.controllers';


const usersRoute = Router();

usersRoute.get('/users', findUserById, getUsersController);

usersRoute.post('/users', createUserController);

usersRoute.put('/users', findUserById, updateUserController);

usersRoute.delete('/users', findUserById, deleteUserController);

export default usersRoute;