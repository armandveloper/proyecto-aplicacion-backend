import { Router } from 'express';
import {
	deleteFile,
	downloadFile,
	existsFile,
	uploadFile,
} from '../controllers/files.controller';

const router = Router();

router.post('/', uploadFile);
router.get('/:file', downloadFile, deleteFile);
router.get('/:file/exists', existsFile);

router.delete('/:id', deleteFile);

export default router;
