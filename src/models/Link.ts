import { model, Schema, Document } from 'mongoose';

export interface ILink extends Document {
	url: string;
	nombre: string;
	nombreOriginal: string;
	descargas: number;
	creadoEl: Date;
}

const linkSchema = new Schema<ILink>({
	url: {
		type: String,
		required: true,
	},
	nombre: {
		type: String,
		required: true,
	},
	nombreOriginal: {
		type: String,
		required: true,
	},
	descargas: {
		type: Number,
		default: 1,
	},
	creadoEl: {
		type: Date,
		default: Date.now(),
	},
});

export default model<ILink>('Link', linkSchema);
