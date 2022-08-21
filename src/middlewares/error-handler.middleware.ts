import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/Database.error.model";
import InvalidIdError from "../models/errors/InvalidId.error.model";
import MissingFieldsError from "../models/errors/MissingFields.error.model";
import NoEffectError from "../models/errors/NoEffect.error.model";
import UserNotFoundError from "../models/errors/UserNotFound.error.model";
const { BAD_REQUEST, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = StatusCodes;

function errorHandler(error: any, _request: Request, response: Response, next: NextFunction) {
  if(
    error instanceof InvalidIdError ||
    error instanceof DatabaseError ||
    error instanceof MissingFieldsError ||
    error instanceof NoEffectError
  ) {
    return response.status(BAD_REQUEST).json({error: error.message});
  }
  if(error instanceof UserNotFoundError) {
    return response.status(NOT_FOUND).json({error: error.message});
  }
  return response.sendStatus(INTERNAL_SERVER_ERROR);
}

export default errorHandler;