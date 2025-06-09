export interface ExcelRow {
  testOrCancel: string;       // 테스트 및 해지
  shippingCompany: string;    // 선사
  shipName: string;           // 선박
  shipKey: string;            // SHIP KEY
  firstReportDate: string;    // 처음 리포트 날짜 (LTC)
  lastReportDate: string;     // 마지막 리포트 날짜 (LTC)
  isUpdated: string;          // 최신화 여부
  dateDiff: string;           // 날짜 차이
  appVersion: string;         // 앱 버전
  notes: string;              // 비고
}

// 한글 헤더 <-> ExcelRow 키 매핑
export const headerMap: Record<string, keyof ExcelRow> = {
  '테스트 및 해지': 'testOrCancel',
  '선사': 'shippingCompany',
  '선박': 'shipName',
  'SHIP KEY': 'shipKey',
  '처음 리포트 날짜 (LTC)': 'firstReportDate',
  '마지막 리포트 날짜 (LTC)': 'lastReportDate',
  '최신화 여부': 'isUpdated',
  '날짜 차이': 'dateDiff',
  '앱 버전': 'appVersion',
  '비고': 'notes',
};