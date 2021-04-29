import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ILink extends Document {
	url: string;
	name: string;
	originalName: string;
	downloads: number;
	user: string;
	password: string;
	createdAt: Date;
	passwordMatch: (password: string) => Promise<Boolean>;
	hashPassword: (password: string) => Promise<void>;
}

const linkSchema = new Schema<ILink>({
	url: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	originalName: {
		type: String,
		required: true,
	},
	downloads: {
		type: Number,
		default: 1,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		default: null,
	},
	password: {
		type: String,
		default: null,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

linkSchema.methods.hashPassword = async function (
	password: string
): Promise<void> {
	this.password = await bcrypt.hash(password, 10);
};

linkSchema.methods.passwordMatch = async function (
	password: string
): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<ILink>('Link', linkSchema);
