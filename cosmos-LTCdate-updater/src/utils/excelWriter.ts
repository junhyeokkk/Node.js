import * as XLSX from 'xlsx';
import { calculateDateDiff } from './dateDiff';

export function writeExcel(filePath: string, data: any[]) {

  // 각 row에 ltc_diff 열(현재와 몇일 차이나는지 확인하는 열) 추가
  const processedData = data.map((item) => ({
    ...item,
    today_diff_days: calculateDateDiff(item.LTCdate),
  }));

  const worksheet = XLSX.utils.json_to_sheet(processedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filePath);
}
