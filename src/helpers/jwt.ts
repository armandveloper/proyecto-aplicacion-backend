import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export const createToken = (user: IUser): string => {
	return jwt.sign(
		{ id: user.id, name: user.name, email: user.email },
		process.env.JWT_SECRET || 'somesecrettoken',
		{
			expiresIn: '8h',
		}
	);
};
