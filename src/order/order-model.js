import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		sale: {
			type: Schema.Types.ObjectId,
			ref: 'Sale',
			required: true,
		},

		quantity: {
			type: Number,
			required: true,
		},

		price: {
			type: Number,
			required: true,
		},
	},
	{ strict: true, timestamps: true, versionKey: false }
);
const OrderModel = model('Order', orderSchema);

export default OrderModel;
