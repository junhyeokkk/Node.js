
import { getLatestLTCByShipkey } from '../repositories/cosmos.repository';
import { readExcel } from '../utils/excelReader';
import { writeExcel } from '../utils/excelWriter';

export async function updateLTCWithExcel(inputPath: string, outputPath: string) {
  const data = readExcel(inputPath);
  const updatedShipkeys: string[] = [];
  let updatedCount = 0;

  for (const row of data) { // 하나의 row당 한번씩 쿼리 돌리기 (성능 개선 가능)
    if (row.test !== 'o') continue;
    const shipkey = row.shipkey;
    if (!shipkey) continue;

    try {
      const latestLTC = await getLatestLTCByShipkey(shipkey);
      if (!latestLTC) continue;

      if (!row.LTCdate || new Date(latestLTC) > new Date(row.LTCdate)) {
        row.LTCdate = latestLTC;
        updatedShipkeys.push(shipkey);
        updatedCount++;
      }
    } catch (err) {
      console.error(`[${shipkey}] 처리 중 오류:`, err);
    }
  }

  if (updatedCount > 0) {
    writeExcel(outputPath, data);
    console.log(`${updatedCount}건 업데이트 완료`);
  } else {
    console.log('업데이트된 데이터 없음');
  }

  return { updatedCount, updatedShipkeys };
}
