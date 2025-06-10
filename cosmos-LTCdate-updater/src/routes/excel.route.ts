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

// 엑셀 업로드 -> LTC 업데이트
router.post('/ltc/update', upload.single('excel'), handleLTCUpdate);

// 엑셀 다운로드 API
router.get('/ltc/download/:filename', 
  (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../response_excel', filename);

  if (!fs.existsSync(filePath)) {
    throw new CustomError('파일을 찾을 수 없습니다다.', 404);
  }

  res.download(filePath);
});

export default router;
