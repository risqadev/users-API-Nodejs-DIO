import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { StatusCodes } from 'http-status-codes';

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, NO_CONTENT } = StatusCodes;

const users: IUser[] = [
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
    return response.status(NOT_FOUND).json({ error: 'User ID not  found.' });
  } else if (!!user.data) {
    return response.status(OK).json(user.data);
  }
}

export function createUserController(request: Request, response: Response) {
  const { name, username, email } = request.body;

  if (!name || !username || !email) {
    return response.status(BAD_REQUEST).json({
      error: 'Some field is missing.'
    });
  }

  const user: IUser = {
    id: uuidv4(),
    name,
    username,
    email
  }

  users.push(user);

  return response.status(CREATED).json(user);
}

export function updateUserController(request: Request, response: Response) {
  const { user } = request;

  if (!user) {
    return response.status(BAD_REQUEST).json({ error: 'Enter user ID.' });
  } else if (!user.data) {
    return response.status(NOT_FOUND).json({ error: 'User ID not  found.' });
  }

  const { name, username, email } = request.body;

  if (!name && !username && !email) {
    return response.status(BAD_REQUEST).json({
      error: 'No fields entered.'
    });
  }

  !!name && (user.data.name = name);
  !!username && (user.data.username = username);
  !!email && (user.data.email = email);

  return response.status(OK).json(user.data);
}

export function deleteUserController(request: Request, response: Response) {
  const { user } = request;

  if (!user) {
    return response.status(BAD_REQUEST).json({ error: 'Enter user ID.' });
  } else if (!user.data) {
    return response.status(NOT_FOUND).json({ error: 'User ID not  found.' });
  }

  users.splice(user.index, 1);

  return response.sendStatus(NO_CONTENT);
}