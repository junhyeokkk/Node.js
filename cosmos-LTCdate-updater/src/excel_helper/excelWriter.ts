import * as XLSX from 'xlsx-js-style';
import { calculateDateDiff } from './dateDiff';
import { ExcelRow, headerMap } from '../models/excelRow';
import { styleText } from 'util';

// 엑셀 출력
export function writeExcel(filePath: string, data: ExcelRow[]) {
  const processedData = data.map((item) => {
    const diff = calculateDateDiff(item.lastReportDate);
    return {
      ...item,
      dateDiff: diff.toString() ,
      isUpdated: diff >= 7 ? '필요' : item.isUpdated,
    };
  });

  // 헤더와 데이터 분리
  const headers = Object.keys(headerMap);
  const excelData = processedData.map(row => {
    const mappedRow: Record<string, any> = {};
    for (const [header, key] of Object.entries(headerMap)) {
      mappedRow[header] = row[key];
    }
    return mappedRow;
  });

  // 엑셀 스타일링 포함해서 시트 구성
  const worksheetData: XLSX.WorkSheet = {};

  // B2에서 시작하도록 기본 오프셋 설정
  const startCol = 1; // B열 
  const startRow = 1; // 2행 

  // 헤더 스타일 정의
  const headerStyle = {
    fill: {
      fgColor: { rgb: 'D9D9D9' }, // 회색 배경
    },
    font: {
      bold: true,
    },
    alignment: {
      vertical: 'center',
      horizontal: 'center',
    },
  };

  const dataStyle = {
    font: {
      styleText : '맑은고딕',
    }
  }

  // 헤더 셀 작성
  headers.forEach((header, colIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ c: startCol + colIndex, r: startRow });
    worksheetData[cellAddress] = {
      v: header,
      t: 's',
      s: headerStyle,
    };
  });

  // 데이터 셀 작성
  excelData.forEach((row, rowIndex) => {
    headers.forEach((header, colIndex) => {
      const value = row[header];
      const cellAddress = XLSX.utils.encode_cell({
        c: startCol + colIndex,
        r: startRow + 1 + rowIndex,
      });
      worksheetData[cellAddress] = {
        v: value,
        t: typeof value === 'number' ? 'n' : 's',
        s: dataStyle,
      };
    });
  });

  // 시트 범위 계산
  const endCol = startCol + headers.length - 1;
  const endRow = startRow + excelData.length;
  worksheetData['!ref'] = XLSX.utils.encode_range({
    s: { c: startCol, r: startRow },
    e: { c: endCol, r: endRow },
  });

  const worksheet = worksheetData as XLSX.WorkSheet;
  
  // 열 너비 설정
  worksheet['!cols'] = [
    { wch: 10 },     // A열 
    { wch: 15 },     // B열
    { wch: 30 },     // C열
    { wch: 32 },     // D열
    { wch: 12 },     // E열
    { wch: 30 },     // F열
    { wch: 30 },     // G열
    { wch: 10 },     // H열
    { wch: 10 },     // I열
    { wch: 10 },     // J열
    { wch: 30 },     // K열
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filePath);
}
