import jwt from 'jsonwebtoken';

import config from '../config/index.js';

export const signToken = (payload) => {
	return jwt.sign(payload, config.jwt.secret);
};
