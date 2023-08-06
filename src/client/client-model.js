import { model, Schema } from 'mongoose';

const clientSchema = new Schema({
	name: {
		type: String,
		maxLength: 255,
		required: true,
	},

	identityCard: {
		type: String,
		unique: true,
		required: true,
	},

	phoneNumber: {
		type: String,
		maxLength: 60,
		required: true,
	},
	email: {
		type: String,
		maxLength: 255,
		default: null,
	},
});

const ClientModel = model('Client', clientSchema);

export default ClientModel;
