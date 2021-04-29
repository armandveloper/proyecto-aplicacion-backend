import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Link from '../models/Link';
import { deleteFile } from './files.controller';

export const createLink = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { originalName } = req.body;
	const link = new Link();
	link.url = nanoid();
	link.name = nanoid();
	link.originalName = originalName;
	if (req.user) {
		const { password, downloads } = req.body;
		link.downloads = downloads || 1;
		if (password) {
			await link.hashPassword(password);
		}
		console.log(req.user.id);
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

export const getLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { url } = req.params;
	try {
		const link = await Link.findOne({ url });
		if (!link) {
			return res
				.status(404)
				.json({ success: false, msg: 'El enlace no existe' });
		}

		const { downloads, originalName, name } = link;

		if (link.downloads === 1) {
			req.fileName = name;
			req.originalname = originalName;
			await Link.findByIdAndDelete(link.id);
			return next();
		} else {
			link.downloads = downloads - 1;
			await link.save();
			return res.json({
				success: true,
				originalName,
				downloads: link.downloads,
			});
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ success: false, msg: 'Ocurrió un error inesperado' });
	}
};
