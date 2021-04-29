import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

export const createUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const body: IUser = req.body;
		const { email, password } = body;
		// Comporbar si existe
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				success: false,
				msg: 'Ya existe una cuenta asociada a ese correo',
			});
		}
		const user = new User(body);
		await user.hashPassword(body.password);
		await user.save();
		return res.json({
			success: true,
			msg: 'La cuenta se ha creado con éxito',
		});
	} catch (err) {
		console.log(err);
		return res.json({
			success: false,
			msg: err.message,
		});
	}
};
