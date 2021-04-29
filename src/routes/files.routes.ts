import { Router } from 'express';
import { deleteFile, uploadFile } from '../controllers/files.controller';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/', isAuthenticated, uploadFile);
router.delete('/:id', deleteFile);

export default router;
