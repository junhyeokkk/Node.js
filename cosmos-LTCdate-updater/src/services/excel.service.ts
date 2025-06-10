import { CustomError } from '../errors/CustomError';
import { shouldProcessRow } from '../excel_helper/excelFilter';
import { readExcel } from '../excel_helper/excelReader';
import { writeExcel } from '../excel_helper/excelWriter';
import { ExcelRow } from '../models/excelRow';
import { getLTCMinMaxByShipkey } from '../repositories/cosmos.repository';

// 조건에 따른 엑셀값 <-> DB값 변경 
function updateRowWithLatestLTC(row: ExcelRow, resultTime: { latest: string, earliest: string | null, appVersion: string | null }, sk: string, updatedShipkeys: string[], updateCounter: { count: number }) {
  row.lastReportDate = resultTime.latest; // 엑셀 마지막 LTC 데이터 DB 값으로 세팅
  row.firstReportDate = resultTime.earliest || ''; // 엑셀 처음 LTC 데이터 DB 값으로 세팅
  row.appVersion = resultTime.appVersion || ''; // 앱 버전
  updatedShipkeys.push(sk);
  updateCounter.count++;
}

// Cosmos <-> excel 데이터 변경 
export async function updateLTCWithExcel(inputPath: string, outputPath: string) {
  const data: ExcelRow[] = readExcel(inputPath);

  const updatedShipkeys: string[] = [];
  const updateCounter = { count: 0 };

  for (const row of data) {
    if (!shouldProcessRow(row)) continue;

    const sk = row.shipKey;

    const resultTime = await getLTCMinMaxByShipkey(sk);

    if (!resultTime.latest) continue;

    const latestDate = new Date(resultTime.latest);
    const rawLastReport = row.lastReportDate;


    // 조건 1: lastReportDate가 빈 문자열
    if (rawLastReport === '') {
      updateRowWithLatestLTC(row, resultTime as { latest: string, earliest: string | null, appVersion: string | null}, sk, updatedShipkeys, updateCounter);
      continue;
    }

    // 조건 2: 날짜 형식이 유효하지 않음
    const rowDate = new Date(rawLastReport);
    if (isNaN(rowDate.getTime())) {
      console.warn(`[${sk}] row.lastReportDate가 유효하지 않아 무시됨:`, rawLastReport);
      updateRowWithLatestLTC(row, resultTime as { latest: string, earliest: string | null, appVersion: string | null }, sk, updatedShipkeys, updateCounter);
      continue;
    }

    // 조건 3: DB의 최신 날짜가 더 나중일 경우
    if (latestDate >= rowDate) {
      updateRowWithLatestLTC(row, resultTime as { latest: string, earliest: string | null, appVersion: string | null }, sk, updatedShipkeys, updateCounter);
    }
  }

  try {
    if (updateCounter.count >= 0) {
      writeExcel(outputPath, data);
      console.log(`${updateCounter.count}건 업데이트 완료`);
    } else {
      console.log('업데이트된 데이터 없음');
    }
  } catch (err) {
    throw new CustomError('엑셀 파일 저장 중 오류 발생', 500);
  }

  return { updatedCount: updateCounter.count, updatedShipkeys };
}