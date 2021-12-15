import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, NO_CONTENT } = StatusCodes;

const users: User[] = [
  {
    id: "6c555d5b-f1e7-4312-beb3-3a802721df4b",
    name: "Ricardo",
    username: "rscamacho",
    email: "rscamachodev@gmail.com"
  },
  {
    id: "309c81e2-ddd8-4600-a361-aaa5784b7676",
    name: "Jacinto",
    username: "jacintinhopazeamor",
    email: "jac-into-qa@teste.com"
  },
  {
    id: "6def4083-380e-454e-b6d1-e855305bbc6d",
    name: "Testenildo",
    username: "tester",
    email: "testador@teste.com"
  }
];

export function findUserById(request: Request, response: Response, next: NextFunction) {
  const { id } = request.headers;

  if (!id) {
    request.user = undefined;
    return next();
  }
  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({ error: 'Invalid ID.' });
  }

  const index = users.findIndex(user => user.id === id);

  if (index > -1) {
    request.user = { index, data: users[index] };
  } else {
    request.user = { index, data: undefined };
  }

  return next();
}

export function getUsersController(request: Request, response: Response) {
  const { user } = request;

  if (!user) {
    return response.status(OK).json(users);
  } else if (!user.data) {
    return response.status(NOT_FOUND).json({ error: 'User ID not found.' });
  } else if (!!user.data) {
    return response.status(OK).json(user.data);
  }
}

export async function createUserController(request: Request, response: Response) {
  const { name, username, email, password } = request.body;

  if (!name || !username || !email || !password) {
    return response.status(BAD_REQUEST).json({
      error: 'Some field is missing.'
    });
  }

  const user: User = {
    name,
    username,
    email,
    password
  }

  const id = await userRepository.create(user);

  return response.status(CREATED).json({ id });
}

export async function updateUserController(request: Request, response: Response) {
  const id = String(request.headers.id);

  if (!id) {
    return response.status(BAD_REQUEST).json({ error: 'Enter user ID.' });
  }
  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({ error: 'Invalid ID.' });
  }

  const user: { name?: string; username?: string; email?: string; password?: string } = request.body;
  const { name, username, email, password } = user;

  if (!name && !username && !email && !password) {
    return response.status(BAD_REQUEST).json({
      error: 'No fields entered.'
    });
  }

  const userData = {
    id,
    ...!!name && ({ name }),
    ...!!username && ({ username }),
    ...!!email && ({ email }),
    ...!!password && ({ password })
  };

  const rowsCount = await userRepository.update(userData);

  if (rowsCount < 1) {
    return response.status(BAD_REQUEST).json({
      error: 'No rows affected in DB.'
    });
  }

  return response.sendStatus(NO_CONTENT);
}

export async function deleteUserController(request: Request, response: Response) {
  const id = String(request.headers.id);

  if (!id) {
    return response.status(BAD_REQUEST).json({ error: 'Enter user ID.' });
  }
  if (!validate(String(id))) {
    return response.status(BAD_REQUEST).json({ error: 'Invalid ID.' });
  }

  const rowsCount = await userRepository.delete(id);

  if (rowsCount < 1) {
    return response.status(BAD_REQUEST).json({
      error: 'No rows affected in DB.'
    });
  }
  if (rowsCount > 1) {
    return response.status(BAD_REQUEST).json({
      error: 'Something feels wrong. Multiple lines were affected by the operation.'
    });
  }

  return response.sendStatus(NO_CONTENT);
}