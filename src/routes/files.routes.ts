import { Router } from 'express';
import {
	deleteFile,
	downloadFile,
	existsFile,
	uploadFile,
} from '../controllers/files.controller';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/', isAuthenticated, uploadFile);
router.get('/:file', downloadFile, deleteFile);
router.get('/:file/exists', existsFile);

router.delete('/:id', deleteFile);

export default router;
