import { v7 as uuidv7 } from "uuid";

export const generateOrderNumber = (
  prefix: string = "ORD",
  length: number = 8
): string => {
  // UUID 생성
  const fullUuid = uuidv7();

  // UUID에서 하이픈 제거
  const cleanUuid = fullUuid.replace(/-/g, "");

  // 현재 날짜를 YYMMDD 형식으로 변환
  const date = new Date();
  const dateStr =
    date.getFullYear().toString().slice(2) +
    String(date.getMonth() + 1).padStart(2, "0") +
    String(date.getDate()).padStart(2, "0");

  // UUID를 지정된 길이만큼 자르기
  const truncatedUuid = cleanUuid.slice(0, length);

  // 최종 주문번호 생성 (prefix + 날짜 + UUID)
  return `${prefix}${dateStr}${truncatedUuid}`;
};
