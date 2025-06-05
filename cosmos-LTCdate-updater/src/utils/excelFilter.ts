
// 엑셀 필터 유틸 함수 
export function shouldProcessRow(row: any): boolean { // 해당 열의 데이터 조회를 패스해도 되는 조건 
  if (row.test !== 'o') return false; // test의 값에 o이 아닐 때
  if (!row.shipkey) return false; // shipkey가 없을 때 
  return true;
}
