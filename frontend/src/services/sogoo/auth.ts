import axios from "../../configs/axios";

export default {
  /**
   * 회원가입
   * @param signUpForm 회원가입 폼 데이터
   */
  signup: async (signUpForm: SignUpForm) => {
    return axios.post("/member/sign-up", signUpForm);
  },
  /**
   * 로그인
   * @param loginForm 로그인 폼 데이터
   */
  login: async (loginForm: LoginForm) => {
    return axios.post<LoginResponse>("/member/login", loginForm);
  },
  /**
   * 로그아웃
   */
  logout: async () => {
    return axios.post("/member/logout");
  },
  /**
   * 이메일 유효성 체크
   */
  checkEmail: async (email: Email) => {
    return axios.post("/member/email-check", { email });
  },
  /**
   * 사업자 인증
   */
  checkSeller: async (businessNumber: BusinessNumber) => {
    return axios.post("/member/seller-check", {
      businessNumber: businessNumber,
    });
  },
};
