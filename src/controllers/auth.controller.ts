import { Request, Response } from 'express';
import { createToken } from '../helpers/jwt';
import User from '../models/User';

const sendInvalidCredentiaslResponse = (res: Response) => {
	return res.status(401).json({
		success: false,
		msg: 'El correo o la contraseña son incorrectos',
	});
};

export const login = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return sendInvalidCredentiaslResponse(res);
		const isValidPassword = await user.passwordMatch(password);
		if (!isValidPassword) return sendInvalidCredentiaslResponse(res);
		const token = createToken(user);
		return res.json({ success: true, token });
	} catch (err) {
		return res.json({
			success: false,
			msg:
				'Ocurrió un error inesperado en el servidor. Intente más tarde',
		});
	}
};

export const getAuthUser = (req: Request, res: Response) => {
	return res.json({ success: true, user: req.user });
};
