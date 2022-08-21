import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import dotenv from 'dotenv';
dotenv.config();

// App configs
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(statusRoute);
app.use(usersRoute);

// Errors
app.use(errorHandler);

// Server
app.listen(process.env.PORT || 3333, () => console.log('Server is running.'));