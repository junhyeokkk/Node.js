import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { handleLTCUpdate } from '../controllers/excel.controller';
import { CustomError } from '../errors/CustomError';

const router = express.Router();

// multer 설정
const upload = multer({
  dest: path.join(__dirname, '../../response_excel'),
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 사이즈 지정 --> 추후 엑셀이 어느정도 용량이 되는가? 파악 
});

/**
 * @swagger
 * /api/excel/update:
 *   post:
 *     summary: 업로드한 엑셀 파일을 바탕으로 Cosmos DB에서 수집한 데이터를 바탕으로 Excel을 업데이트합니다.
 *     tags: [Excel]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               excel:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Excel 업데이트 성공
 *       404:
 *         description: 엑셀 파일이 필요함
 */
router.post('/excel/update', upload.single('excel'), handleLTCUpdate);


/**
 * @swagger
 * /api/excel/download/{filename}:
 *   get:
 *     summary: 처리된 엑셀 파일을 다운로드합니다.
 *     tags: [Excel]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: 다운로드할 파일 이름
 *     responses:
 *       200:
 *         description: 파일 다운로드 성공
 *       404:
 *         description: 파일을 찾을 수 없음
 */
router.get('/excel/download/:filename', 
  (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../response_excel', filename);

  if (!fs.existsSync(filePath)) {
    throw new CustomError('파일을 찾을 수 없습니다.', 404);
  }

  res.download(filePath);
});

export default router;
