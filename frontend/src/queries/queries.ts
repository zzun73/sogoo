import { useQuery } from "@tanstack/react-query";
import keys from "./keys";
import sogoo from "../services/sogoo";

/**
 * 이메일 중복 처리
 * @param email
 */
const useCheckEmail = (email: Email) => {
  const queryResponse = useQuery({
    queryKey: keys.checkEmail(email),
    queryFn: () => sogoo.checkEmail(email),
    enabled: false,
  });

  return queryResponse;
};

/**
 * 사업자 번호 인증
 * @param businessNumber
 */
const useCheckSeller = (businessNumber: BusinessNumber) => {
  const queryResponse = useQuery({
    queryKey: keys.checkSeller(businessNumber),
    queryFn: () => sogoo.checkSeller(businessNumber),
    enabled: false,
  });

  return queryResponse;
};

/**
 * 매장 목록 조회
 */
const useGetStoreList = () => {
  const { data } = useQuery({
    queryKey: keys.getStoreList(),
    queryFn: () => sogoo.getStoreList(),
  });

  const stores = data ? data.data : [];
  return stores;
};

/**
 * (구매자) 마이페이지 정보 조회
 */
const useGetBuyerMyPage = () => {
  const queryResponse = useQuery({
    queryKey: keys.getBuyerMypage(),
    queryFn: () => sogoo.getBuyerMyPage(),
    select: (response) => response.data,
  });

  return queryResponse;
};

/**
 * (판매자) 내 가게 가져오기
 */
const useGetMyStores = () => {
  const { data } = useQuery({
    queryKey: keys.getMyStores(),
    queryFn: () => sogoo.getMyStores(),
  });

  const stores = data ? data.data : [];
  return stores;
};

export { useCheckEmail, useCheckSeller, useGetStoreList, useGetBuyerMyPage, useGetMyStores };
