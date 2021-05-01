import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Link from '../models/Link';

export const createLink = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { originalName, filename } = req.body;
	const link = new Link();
	link.url = nanoid();
	link.name = filename;
	link.originalName = originalName;
	if (req.user) {
		const { password, downloads } = req.body;
		link.downloads = downloads || 1;
		if (password) {
			await link.hashPassword(password);
		}
		link.user = req.user.id;
	}
	try {
		await link.save();
		return res.json({ success: true, url: link.url });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			msg: 'Ocurrió un error inesperado. Intente más tarde',
		});
	}
};

export const getLinks = async (req: Request, res: Response) => {
	try {
		const links = await Link.find().select('url -_id');
		return res.json({ success: true, links });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ success: false, msg: 'Error al recuperar los enlaces' });
	}
};

export const hasPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.params;
	try {
		const link = await Link.findOne({ url });
		if (!link) {
			return res.status(404).json({
				success: false,
				msg: 'El enlace no existe',
			});
		}
		if (link.password) {
			return res.json({
				success: true,
				filename: link.name,
				url: link.url,
				password: true,
			});
		}
		next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			msg: 'Ocurrió un error inesperado',
		});
	}
};

export const getLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.params;
	try {
		const link = await Link.findOne({ url });
		if (!link) {
			res.status(404).json({
				success: false,
				msg: 'El enlace no existe',
			});
			return next();
		}
		res.json({
			success: true,
			filename: link.name,
			password: false,
			url: link.url,
		});
		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			msg: 'Ocurrió un error inesperado',
		});
		return next();
	}
};

export const verifyPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.params;
	const { password } = req.body;
	try {
		const link = await Link.findOne({ url });
		if (!link) {
			return res.status(404).json({
				success: false,
				msg: 'El enlace no existe',
			});
		}
		const isValid = await link.passwordMatch(password);

		if (!isValid) {
			return res.status(401).json({
				success: false,
				msg: 'La contraseña es incorrecta',
			});
		}
		return next();
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			msg: 'Ocurrió un error inesperado',
		});
	}
};
