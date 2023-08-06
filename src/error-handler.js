// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
	/**
	 * Handle error messages and status code.
	 */
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let { message } = error;

	// Joi 'ValidationError'
	if (error.name === 'ValidationError') statusCode = 422;

	if (message === 'Unauthorized') statusCode = 401;

	/**
	 * 'Not found' is the prefix of all messages that services must throw
	 *  when some entity was not found.
	 */
	if (error.message.split(' ').slice(0, 2).join('') === 'Notfound') {
		statusCode = 404;
	}

	if (error.name === 'CastError') {
		/**
		 * TODO: 'CastError' not only happens when the value is not a valid ObjectId.
		 */
		message = `error type: 'CastError' - Value '${error.value}' is not a valid ObjectId`;
		statusCode = 400;
	}

	if (error.code === 11000) {
		/**
		 * Mongoose code 11000 happends when the inserting value violates a unique schema field.
		 */
		statusCode = 400;

		const fields = Object.keys(error.keyPattern);
		message = fields
			.map((field) => {
				const value = error.keyValue[field];
				return `Field: '${field}' with value '${value}' is already in use.`;
			})
			.join(' ');
	}

	return res.status(statusCode).json({
		success: false,
		message,
	});
};

export default errorHandler;
