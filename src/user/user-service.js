import * as bcrypt from 'bcrypt';
import User from './user-model.js';

export async function createUser({ email, password }) {
	const hashedPassword = bcrypt.hashSync(password, 10);
	const user = new User({
		email,
		password: hashedPassword,
	});
	await user.save();

	const userToSend = user.toJSON();
	delete userToSend.password;

	return userToSend;
}
