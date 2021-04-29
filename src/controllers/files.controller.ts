import path from 'path';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, '..', 'uploads'));
		},
		filename: function (req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, nanoid() + ext);
		},
	});

	// Si está autenticado 10mb sino 1mb
	const fileSize = req.user ? 1024 * 1024 * 10 : 1024 * 1024;

	const multerConfig = {
		limits: { fileSize },
		storage,
	};

	const upload = multer(multerConfig).single('file');

	upload(req, res, (err: any) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		return res.json({ success: true, file: req.file });
	});
};

export const deleteFile = (req: Request, res: Response) => {
	const filePath = path.join(__dirname, '..', 'uploads', req.fileName);

	fs.unlink(
		`${filePath}${path.extname(req.originalname)}`,
		(err: NodeJS.ErrnoException | null) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					success: false,
					msg: 'Error al eliminar el archivo',
				});
			}
			return res.json({
				success: true,
				msg: 'El archivo se ha eliminado',
			});
		}
	);
};
