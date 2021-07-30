import { Router } from 'express';
import { body } from 'express-validator';
import { checkErrors } from '../validations/check-errors';
import { createLink, getLink, getLinks } from '../controllers/links.controller';

const router = Router();

router.post(
	'/',
	[
		body('filename', 'Debe subir un archivo').not().isEmpty(),
		body('originalName', 'Debe subir un archivo').not().isEmpty(),
		checkErrors,
	],
	createLink
);

router.get('/', getLinks);

router.get('/:url', getLink);

router.post('/:url', getLink);

export default router;
