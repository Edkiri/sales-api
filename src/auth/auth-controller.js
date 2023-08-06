import * as bcrypt from 'bcrypt';

import User from '../user/user-model.js';
import { signToken } from './utils.js';

const signup = async (req, res, next) => {
	try {
		const { password, email } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 10);

		const user = new User({
			email,
			password: hashedPassword,
		});
		await user.save();

		const userToSend = user.toJSON();
		delete userToSend.password;

		res.status(201).json({
			success: true,
			data: {
				user: userToSend,
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
