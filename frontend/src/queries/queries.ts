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
export { useCheckEmail };

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
export { useCheckSeller };
