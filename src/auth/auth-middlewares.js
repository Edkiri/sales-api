import jwt from 'jsonwebtoken';

import config from '../config';
import User, { roles } from '../user/user-model.js';

export const isAuthenticated = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) throw new Error('Unauthorized');

		const token = bearerToken.split(' ')[1];
		const { userId } = jwt.verify(token, config.jwt.secret);

		const user = await User.findById(userId, { password: 0 });
		if (!user) throw new Error('Unauthorized');

		req.user = user;
		return next();
	} catch (error) {
		if (error.message === 'invalid token') error.message = 'Unauthorized';
		return next(error);
	}
};

export const isAdmin = async (req, res, next) => {
	const { user } = req;
	if (user.role !== roles.ADMIN && user.role !== roles.SUPERADMIN) {
		const error = new Error('Unauthorized');
		return next(error);
	}
	return next();
};
