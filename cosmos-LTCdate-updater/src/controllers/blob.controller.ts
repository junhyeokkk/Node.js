import { NextFunction, Request, Response } from 'express';
import { AzureService } from '../services/blob.service';

const azureService = new AzureService();

export const getLatestJsonFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shipkey = req.params.shipkey;
    const latestFilePath = await azureService.findLatestJsonFile(shipkey);
    res.json({ latestFilePath });
  } catch (err) {
     next(err); // 전역 에러 핸들러로 던지기 
  }
};
