import { model, Schema } from 'mongoose';

export const roles = {
	USER: 'user',
	ADMIN: 'admin',
	SUPERADMIN: 'superadmin',
};

const UserSchema = new Schema(
	{
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			unique: true,
		},

		password: { type: String, required: true, trim: true, minLength: 6 },

		role: {
			type: String,
			enum: Object.values(roles),
			default: roles.USER,
		},
	},
	{ strict: true, timestamps: true, versionKey: false }
);

const User = model('User', UserSchema);

export default User;
