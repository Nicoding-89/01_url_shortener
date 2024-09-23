import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { checkDatabaseConnection } from './config/db.config.js';
import urlRouter from './src/routes/url.route.js';
import errors from './src/middlewares/error.middleware.js';
import redirectRouter from './src/routes/redirect.route.js';

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

app.use('/api/v1/urls', urlRouter);
app.use('/', redirectRouter);
app.use((req, res, next) => {
  errors.e404(req, res, { message: 'The requested route was not found.' }); 
});

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