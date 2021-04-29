import { Router } from 'express';
import { body } from 'express-validator';
import { isAuthenticated } from '../middlewares/auth';
import { checkErrors } from '../validations/check-errors';
import { createLink, getLink } from '../controllers/links.controller';
import { deleteFile } from '../controllers/files.controller';

const router = Router();

router.post(
	'/',
	[
		body('originalName', 'Debe subir un archivo').not().isEmpty(),
		checkErrors,
		isAuthenticated,
	],
	createLink
);

router.get('/:url', getLink, deleteFile);

export default router;
