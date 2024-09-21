import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { checkDatabaseConnection } from './config/db.config.js';

const app = express();
const PORT = process.env.PORT || 4000;

//General middlewares

app.use(cors({
	origin: '*',
	methods: 'GET,POST,DELETE'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database and server connection

const connectToDatabase = async () => {
	try {
		await checkDatabaseConnection();
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(error);
	};
};
connectToDatabase();