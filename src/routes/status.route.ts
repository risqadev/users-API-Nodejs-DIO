import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const statusRoute = Router();

statusRoute.get('/status', (_request: Request, response: Response) => {
  return response.status(StatusCodes.OK).json({ status: 'Server is running.' });
});

export default statusRoute;