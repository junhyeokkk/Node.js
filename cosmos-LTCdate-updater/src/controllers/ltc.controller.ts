import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { updateLTCWithExcel } from '../services/ltc.service';

export async function handleLTCUpdate(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({ error: '엑셀 파일이 필요합니다.' });
    return;
  }

  const inputPath = req.file.path;

  // 파일명 생성
  const now = new Date();
  const formatted = now.toISOString().replace(/[-:.TZ]/g, ''); // 예: 20250604T125301 -> 20250604T125301
  const fileName = `response_${formatted}.xlsx`;

  // 디렉토리와 전체 경로 설정
  const responseDir = path.join(__dirname, '../response_excel');
  const outputPath = path.join(responseDir, fileName);

  // 폴더 없으면 생성
  if (!fs.existsSync(responseDir)) {
    fs.mkdirSync(responseDir, { recursive: true });
  }

  try {
    const result = await updateLTCWithExcel(inputPath, outputPath);

    res.status(200).json({
      message: `${result.updatedCount}건 업데이트 완료`,  
      updatedShipkeys: result.updatedShipkeys,
      downloadUrl: `/api/ltc/download/${fileName}`, // URL도 업데이트
    });

    fs.unlink(inputPath, () => {});
  } catch (err) {
    console.error('LTC 업데이트 실패:', err);
    res.status(500).json({ error: 'LTC 업데이트 중 오류 발생' });
  }
}
