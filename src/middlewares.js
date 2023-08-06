export const validate = (schema) => (req, res, next) => {
	/**
	 * Validate request body based on Joi schema.
	 */

	const { error } = schema.validate(req.body);

	if (error) {
		return next(error);
	}
	return next();
};

export const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	return next(error);
};
