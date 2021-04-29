import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/database';
import indexRoutes from './routes/index.routes';

config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', indexRoutes);

app.listen(process.env.PORT, () => {
	console.log('The application is listening on port', process.env.PORT);
});
