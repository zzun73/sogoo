import axios from "../../configs/axios";

export default {
  /**
   * 회원가입
   * @param signUpForm 회원가입 폼 데이터
   */
  signup: async (signUpForm: SignUpForm) => {
    return axios.post("/api/member/sign-up", signUpForm);
  },
  /**
   * 로그인
   * @param loginForm 로그인 폼 데이터
   */
  login: async (loginForm: LoginForm) => {
    return axios.post<LoginResponse>("/api/member/login", loginForm);
  },
  /**
   * 로그아웃
   */
  logout: async () => {
    return axios.post("/api/member/logout");
  },
  /**
   * 이메일 유효성 체크
   */
  checkEmail: async (email: Email) => {
    return axios.post("/api/member/email-check", { email });
  },
};
