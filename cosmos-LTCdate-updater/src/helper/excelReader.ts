import * as XLSX from 'xlsx';
import { ExcelRow, headerMap } from '../models/excelRow';
import { CustomError } from '../errors/CustomError';

// 엑셀 읽어 Data로 리턴 함수 
export function readExcel(filePath: string): ExcelRow[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 시트를 2차원 배열로 읽기
  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
  });

  const headerKeys = Object.keys(headerMap);

  // 헤더 행 찾기
  const headerIndex = rows.findIndex(row =>
    Array.isArray(row) &&
    headerKeys.every(key =>
      row.some(cell => typeof cell === 'string' && cell.trim() === key.trim()) // 한글이면서 ExcelRow의 key값이 들어있는 행
    )
  );

  if (headerIndex === -1) {
    throw new CustomError("헤더 행을 찾을 수 없습니다.", 400);
  }

  const headerRow = rows[headerIndex]; // 헤더 행
  const dataRows = rows.slice(headerIndex + 1); // 데이터 행

  // 데이터 매핑
  const data: ExcelRow[] = dataRows.map(row => {
    const obj: Partial<ExcelRow> = {};
    headerRow.forEach((headerText, index) => {
      const modelKey = headerMap[headerText];
      if (modelKey) {
        obj[modelKey] = row[index] ?? '';
      }
    });
    return obj as ExcelRow;
  });

  return data;
}
