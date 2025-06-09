// DB 조회 조건 함수 
export function shouldProcessRow(row: any): boolean { // 해당 열의 데이터 조회를 패스해도 되는 조건 
 
  if (row.testOrCancel == 'true') return false; // test의 값이 아닐때 
  if (!row.shipKey) return false; // shipkey가 없을 때 
  return true;
}
