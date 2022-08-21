import { NextFunction, Request, Response } from 'express';
import * as uuid from 'uuid';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';
const { OK, CREATED, NO_CONTENT } = StatusCodes;
import UserNotFoundError from '../models/errors/UserNotFound.error.model';
import InvalidIdError from '../models/errors/InvalidId.error.model';
import MissingFieldsError from '../models/errors/MissingFields.error.model';
import NoEffectError from '../models/errors/NoEffect.error.model';


export async function getAllUsersController(_request: Request, response: Response, next: NextFunction) {
  try {
    const users = await userRepository.findAllUsers();
    if (!users.length)
      throw new UserNotFoundError('No users found.');

    return response.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdController(request: Request, response: Response, next: NextFunction) {
  try {
    const {id} = request.params;
    if (!uuid.validate(String(id)))
      throw new InvalidIdError();

    const user = await userRepository.findById(id);
    if (!user)
      throw new UserNotFoundError();

    return response.status(OK).json(user);
  } catch (error) {
    next(error);
  }
}

export async function createUserController(request: Request, response: Response, next: NextFunction) {
  try {
    const { name, username, email, password } = request.body;
    if (!name || !username || !email || !password)
      throw new MissingFieldsError();
  
    const user: User = {
      name,
      username,
      email,
      password
    }
  
    const id = await userRepository.create(user);
  
    return response.status(CREATED).json({ id });
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    if (!uuid.validate(String(id)))
      throw new InvalidIdError();
    
    const { name, username, email, password } = request.body;
    if (!name && !username && !email && !password)
      throw new MissingFieldsError('Enter fields to update.');
  
    const userData = {
      id,
      ... !!name && ({ name }),
      ... !!username && ({ username }),
      ... !!email && ({ email }),
      ... !!password && ({ password })
    };
  
    const rowsCount = await userRepository.update(userData);
    if (rowsCount < 1)
      throw new NoEffectError();
  
    return response.sendStatus(NO_CONTENT);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(request: Request, response: Response, next: NextFunction) {
  try {
    const {id} = request.params;
    if (!uuid.validate(String(id)))
      throw new InvalidIdError();
  
    const rowsCount = await userRepository.delete(id);
    if (rowsCount < 1)
      throw new NoEffectError();
  
    return response.sendStatus(NO_CONTENT);
  } catch (error) {
    next(error);
  }
}