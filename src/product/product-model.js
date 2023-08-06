import { model, Schema } from 'mongoose';

const productSchema = new Schema(
	{
		brand: {
			type: String,
			maxLength: 255,
			default: null,
		},

		reference: {
			type: String,
			maxLength: 255,
			default: null,
		},

		code: {
			type: String,
			maxLength: 255,
			unique: true,
		},

		name: {
			type: String,
			maxLength: 255,
			required: true,
			index: true,
		},

		price: {
			type: Number,
			default: null,
		},

		stock: {
			type: Number,
			default: 0,
		},
	},
	{ strict: true, timestamps: false, versionKey: false }
);

const Product = model('Product', productSchema);

export default Product;
