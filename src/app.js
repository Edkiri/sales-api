import express from 'express';
import cors from 'cors';

import authRouter from './auth/auth-router.js';
import errorHandler from './error-handler.js';
import { notFound } from './middlewares.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		success: true,
		data: {
			message: 'Listening',
		},
	});
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
