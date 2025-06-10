
import { Router } from 'express';
import { getLatestJsonFile } from '../controllers/blob.controller';

const router = Router();

router.get('/latest-json/:shipkey', getLatestJsonFile);

export default router;
