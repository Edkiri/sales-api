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

		roles: {
			type: [{ type: String, enum: Object.values(roles) }],
			trim: true,
			default: [roles.CLIENT],
		},

		onBoarded: { type: Boolean, default: false },
	},
	{ strict: true, timestamps: true }
);

const User = model('User', UserSchema);

export default User;
