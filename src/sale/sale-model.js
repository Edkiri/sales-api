import { Schema, model } from 'mongoose';

export const salesStatus = {
	UNPAID: 1,
	REFUNDING: 2,
	FINISHED: 3,
};

const saleSchema = new Schema(
	{
		date: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
			maxLength: 255,
			default: null,
		},

		status: {
			type: Number,
			required: true,
			enum: Object.values(salesStatus),
			default: salesStatus.UNPAID,
		},

		isFinished: {
			type: Boolean,
			default: false,
		},

		client: {
			type: Schema.Types.ObjectId,
			ref: 'Client',
		},
	},
	{ strict: true, timestamps: true, versionKey: false }
);

const Sale = model('Sale', saleSchema);

export default Sale;
