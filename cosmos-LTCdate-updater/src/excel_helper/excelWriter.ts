import * as XLSX from 'xlsx';
import { calculateDateDiff } from './dateDiff';
import { ExcelRow, headerMap } from '../models/excelRow';

export function writeExcel(filePath: string, data: ExcelRow[]) {
  const processedData = data.map((item) => {
    const diff = calculateDateDiff(item.lastReportDate);
    return {
      ...item,
      dateDiff: diff.toString(), // 현재시간과 차이 일수 
      isUpdated: diff >= 7 ? '필요' : item.isUpdated,  // dateDiff가 7 이상이면 최신화 '필요' 
    };
  });

  // 출력을 위한 엑셀 데이터 한글로 다시 매핑 
  const excelData = processedData.map(row => {
    const mappedRow: Record<string, any> = {};
    for (const [header, key] of Object.entries(headerMap)) {
      mappedRow[header] = row[key];
    }
    return mappedRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData, { header: Object.keys(headerMap) });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filePath);
}
