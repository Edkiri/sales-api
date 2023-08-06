import * as bcrypt from 'bcrypt';

import User from '../user/user-model.js';
import { createUser } from '../user/user-service.js';
import { signToken } from './utils.js';

const signup = async (req, res, next) => {
	try {
		const { password, email } = req.body;

		const user = await createUser({ password, email });

		res.status(201).json({
			success: true,
			data: {
				user,
			},
		});
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) throw new Error(`Unauthorized`);

		const isMatch = bcrypt.compareSync(password, user.password);
		if (!isMatch) throw new Error(`Unauthorized`);

		const token = signToken({ userId: user.id, roles: user.roles });

		const userToSend = await User.findOne({ email }, { password: 0 });

		res.status(201).json({
			success: true,
			data: {
				user: userToSend,
				token,
			},
		});
	} catch (err) {
		next(err);
	}
};

export default { signup, login };
