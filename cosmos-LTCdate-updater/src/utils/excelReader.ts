// 엑셀 분석
import * as XLSX from 'xlsx';

export function readExcel(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 전체 시트를 2차원 배열로 변환
  const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
  });
  
  // 헤더 행 찾기
  const REQUIRED_HEADERS = ['shipkey', 'LTCdate']; // 헤더를 찾기위한 요소!
  const headerIndex = rows.findIndex(row =>
    REQUIRED_HEADERS.every(header => row.includes(header))
  );
    if (headerIndex === -1) {
      throw new Error("헤더 행을 찾을 수 없습니다.");
    }

  const header = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1); // 헤더 아래의 행들만 추출

  console.log('header 형식 : ' , header);
  console.log('data rows 형식 : ' , dataRows);

  // 헤더에 맞춰 객체로 변환
  const data = dataRows.map(row => {
    const obj: { [key: string]: any } = {};
    header.forEach((key: string, index: number) => {
      obj[key] = row[index] ?? '';
    });
    return obj;
  });
  return data;
}
