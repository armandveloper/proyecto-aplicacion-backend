import { Router } from 'express';
import { body } from 'express-validator';
import { createUser } from '../controllers/users.controller';
import { checkErrors } from '../validations/check-errors';

const router = Router();

router.post(
	'/',
	[
		body('email', 'El email debe ser válido').isEmail(),
		body('name', 'El nombre es obligatorio').not().isEmpty(),
		body(
			'password',
			'La contraseña debe tener al menos 8 carácteres '
		).isLength({ min: 8 }),
		checkErrors,
	],
	createUser
);

export default router;
