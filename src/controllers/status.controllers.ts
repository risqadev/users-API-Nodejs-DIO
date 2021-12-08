import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

function statusController(_request: Request, response: Response) {
  return response.status(StatusCodes.OK).json({ status: 'Server is running.' });
}

export { statusController };