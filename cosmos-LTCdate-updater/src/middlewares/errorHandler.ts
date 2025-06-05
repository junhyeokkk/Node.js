import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';


// 전역 에러 처리 핸들러
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || '서버 오류가 발생했습니다.'; // 추후 에러메시지도 확장 

  console.error(`[Error] ${req.method} ${req.url} ->`, err);

  res.status(status).json({ error: message });
}
