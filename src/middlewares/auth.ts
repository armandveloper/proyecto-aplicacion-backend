import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		return next();
	}

	const token = authHeader.split(' ')[1];
	try {
		const user = jwt.verify(
			token,
			process.env.JWT_SECRET || 'somesecrettoken'
		);
		req.user = user as { id: string; name: string; email: string };
	} catch (err) {
		console.log(err);
	}
	return next();
};
