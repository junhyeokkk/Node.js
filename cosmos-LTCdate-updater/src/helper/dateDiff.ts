// 날짜 차이 계산 유틸 함수
export function calculateDateDiff(LTCdate: string): number | null {
  if (!LTCdate) return null;

  const ltcDate = new Date(LTCdate);
  if (isNaN(ltcDate.getTime())) return null;

  const today = new Date();
  const diffTime = today.getTime() - ltcDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}