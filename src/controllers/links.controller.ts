import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Link from '../models/Link';

export const createLink = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { originalName, filename, downloads } = req.body;
	const link = new Link();
	link.url = nanoid();
	link.nombre = filename;
	link.nombreOriginal = originalName;
	link.descargas = downloads;
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
			filename: link.nombre,
      originalName: link.nombreOriginal,
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
