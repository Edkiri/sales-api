import { model, Schema } from 'mongoose';

export const roles = {
	CLIENT: 'client',
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
			default: roles.CLIENT,
		},
	},
	{ strict: true, timestamps: true, versionKey: false }
);

const User = model('User', UserSchema);

export default User;
