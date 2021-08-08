import path from 'path';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database';
import indexRoutes from './routes/index.routes';

config();

const app = express();

connectDB();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || '',
	})
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/api', indexRoutes);

app.listen(process.env.PORT, () => {
	console.log('The application is listening on port', process.env.PORT);
});
