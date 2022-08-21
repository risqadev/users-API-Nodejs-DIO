import { Router } from 'express';
import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from '../controllers/user.controllers';


const usersRoute = Router();

usersRoute.get('/users', getAllUsersController);

usersRoute.get('/users/:id', getUserByIdController);

usersRoute.post('/users', createUserController);

usersRoute.put('/users/:id', updateUserController);

usersRoute.delete('/users/:id', deleteUserController);

export default usersRoute;