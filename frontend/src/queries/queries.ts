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
    enabled: !!email, // email 값이 있을 때만 쿼리 실행
  });

  return queryResponse;
};

const useGetStoreList = () => {
  const { data } = useQuery({
    queryKey: keys.getStoreList(),
    queryFn: () => sogoo.getStoreList(),
  });

  const stores = data ? data.data : [];
  return stores;
};

export { useCheckEmail, useGetStoreList };
