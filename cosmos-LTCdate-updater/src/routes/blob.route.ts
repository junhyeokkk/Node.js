
import { Router } from 'express';
import { getLatestJsonFile } from '../controllers/blob.controller';

const router = Router();

/**
 * @swagger
 * /blob/latest-json/{shipkey}:
 *   get:
 *     summary: 특정 shipkey에 대한 최신 JSON 파일을 조회합니다.
 *     tags: [Blob]
 *     parameters:
 *       - in: path
 *         name: shipkey
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 shipkey
 *     responses:
 *       200:
 *         description: JSON 파일 반환 성공
 *       404:
 *         description: 파일을 찾을 수 없음
 */
router.get('/latest-json/:shipkey', getLatestJsonFile);

export default router;
