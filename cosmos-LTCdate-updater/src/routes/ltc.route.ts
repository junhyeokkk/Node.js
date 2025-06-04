import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { handleLTCUpdate } from '../controllers/ltc.controller';

const router = express.Router();

// multer 설정
const upload = multer({
  dest: path.join(__dirname, '../../response_excel'),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 엑셀 업로드 → LTC 업데이트
router.post('/ltc/update', upload.single('excel'), handleLTCUpdate);

// 엑셀 다운로드 API
router.get('/ltc/download/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../response_excel', filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: '파일을 찾을 수 없습니다.' });
    return;
  }

  res.download(filePath);
});

export default router;
