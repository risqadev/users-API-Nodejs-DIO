import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

// App configs
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use(statusRoute);
app.use(usersRoute);

// Server
app.listen(3333, () => console.log('Server is running.'));