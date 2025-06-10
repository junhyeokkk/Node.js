import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { updateLTCWithExcel } from '../services/excel.service';
import { CustomError } from '../errors/CustomError';

export async function handleLTCUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    
    if (!req.file) {
      throw new CustomError('엑셀 파일이 필요합니다.', 400);
    }

    const inputPath = req.file.path;

    const now = new Date();
    const formatted = now.toISOString().replace(/[-:.TZ]/g, '');
    const fileName = `response_${formatted}.xlsx`;

    const responseDir = path.join(__dirname, '../response_excel');
    const outputPath = path.join(responseDir, fileName);

    if (!fs.existsSync(responseDir)) {
      fs.mkdirSync(responseDir, { recursive: true });
    }

    const result = await updateLTCWithExcel(inputPath, outputPath);

    res.status(200).json({
      message: `${result.updatedCount}건 업데이트 완료`,
      updatedShipkeys: result.updatedShipkeys,
      downloadUrl: `/api/ltc/download/${fileName}`,
    });

    fs.unlink(inputPath, () => {}); // 파일 업로드 후 사용 다했으면 용량 차지하니까 지우기 
  } catch (err) {
    next(err); // 전역 에러 핸들러로 던지기 
  }
}