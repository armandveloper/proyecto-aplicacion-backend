import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	email: string;
	name: string;
	password: string;
	passwordMatch: (password: string) => Promise<Boolean>;
	hashPassword: (password: string) => Promise<void>;
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
});

// userSchema.pre<IUser>('save', async function (next) {
// 	const user = this;

// 	if (!user.isModified('password')) return next();

// 	const salt = await bcrypt.genSalt(10);
// 	const hash = await bcrypt.hash(user.password, salt);
// 	user.password = hash;

// 	next();
// });

userSchema.methods.hashPassword = async function (
	password: string
): Promise<void> {
	this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.passwordMatch = async function (
	password: string
): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
