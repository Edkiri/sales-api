import mongoose from 'mongoose';

import app from './app.js';
import config from './config/index.js';

const { port } = config;
const { url, options } = config.mongoose;

mongoose
	.connect(url, options)
	.then(() => {
		mongoose.set('strictQuery', true);

		app.listen(port, () => {
			console.log(`Listening at port ${port}`);
		});
	})
	.catch((error) => console.log(error));
