// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let { message } = error;

	if (error.name === 'ValidationError') statusCode = 422;

	if (message === 'Unauthorized') statusCode = 401;

	if (error.message.split(' ').slice(0, 2).join('') === 'Notfound') {
		statusCode = 404;
	}

	if (error.name === 'CastError') {
		message = `error type: 'CastError' - Value '${error.value}' is not a valid ObjectId`;
		statusCode = 400;
	}

	if (error.code === 11000) {
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
