import { Router } from 'express';
import { body } from 'express-validator';
import { isAuthenticated } from '../middlewares/auth';
import { checkErrors } from '../validations/check-errors';
import {
	createLink,
	getLink,
	getLinks,
	hasPassword,
	verifyPassword,
} from '../controllers/links.controller';

const router = Router();

router.post(
	'/',
	[
		body('filename', 'Debe subir un archivo').not().isEmpty(),
		body('originalName', 'Debe subir un archivo').not().isEmpty(),
		checkErrors,
		isAuthenticated,
	],
	createLink
);

router.get('/', getLinks);

router.get('/:url', hasPassword, getLink);

router.post('/:url', verifyPassword, getLink);

export default router;
