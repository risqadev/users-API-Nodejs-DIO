import { NextFunction, Request, Response, Router, json } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';

interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string
}

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, NO_CONTENT } = StatusCodes;

const users: IUser[] = [
  {
    id: uuidv4(),
    name: 'Ricardo',
    username: 'rscamacho',
    email: 'rscamachodev@gmail.com',
    password: '123456'
  },
  {
    id: uuidv4(),
    name: 'Jacinto',
    username: 'jacintinhopazeamor',
    email: 'jac-into@gmail.com',
    password: '12345678'
  },
];

const usersRoute = Router();

usersRoute.get('/users', (request: Request, response: Response) => {
  const { id } = request.headers;

  if (!id) {
    return response.status(OK).json(users);
  }

  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({
      error: 'Invalid ID.'
    });
  }

  const user = users.find(user => user.id === id);

  if (!user) {
    return response.status(NOT_FOUND).json({ error: 'User id not found.' });
  }

  return response.status(OK).json(user);
});

usersRoute.post('/users', (request: Request, response: Response) => {
  const { name, username, email, password } = request.body;

  if (!name || !username || !email || !password) {
    return response.status(BAD_REQUEST).json({
      error: 'Some field is missing.'
    });
  }

  const user: IUser = {
    id: uuidv4(),
    name,
    username,
    email,
    password
  }

  users.push(user);

  return response.status(CREATED).json(user);
});

usersRoute.put('/users', (request: Request, response: Response) => {
  const { id } = request.headers;

  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({
      error: 'Invalid ID.'
    });
  }

  const { name, username, email, password } = request.body;

  if (!name && !username && !email && !password) {
    return response.status(BAD_REQUEST).json({
      error: 'No fields entered.'
    });
  }

  const user = users.find(user => user.id === id);

  if (!user) {
    return response.status(NOT_FOUND).json({
      error: 'User ID not found.'
    });
  }

  !!name && (user.name = name);
  !!username && (user.username = username);
  !!email && (user.email = email);
  !!password && (user.password = password);

  return response.status(OK).json(user);
});

usersRoute.delete('/users', (request: Request, response: Response) => {
  const { id } = request.headers;

  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({
      error: 'Invalid ID.'
    });
  }

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(NOT_FOUND).json({
      error: 'User ID not found.'
    });
  }

  users.splice(userIndex, 1);

  return response.sendStatus(NO_CONTENT);
});

export default usersRoute;