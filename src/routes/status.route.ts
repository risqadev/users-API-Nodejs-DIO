import { Router } from 'express';
import { statusController } from '../controllers/status.controllers';

const statusRoute = Router();

statusRoute.get('/status', statusController);

export default statusRoute;