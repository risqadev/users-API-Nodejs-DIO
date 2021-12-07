import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response, next: NextFunction) => {
  return response.send('Olá, mundos!');
});

app.listen(3333, () => console.log('Server is running.'));