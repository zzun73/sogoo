// 자주 사용되는 변수에 대한 type 정의

type Name = string;
type Email = string;
type Password = string;
type phoneNumber = string;
type Birth = string;
type Address = string;
type Role = string;
type AccessToken = string;
type BusinessNumber = string | null;

// request, response 변수에 대한 type 정의

interface SignUpForm {
  name: Name;
  email: Email;
  password: Password;
  phoneNumber: phoneNumber;
  birth: Birth;
  address: Address;
  role: Role;
  businessNumber: BusinessNumber;
}

interface LoginForm {
  email: Email;
  password: Password;
}

// response에 대한 type 정의
interface LoginResponseData {
  accessToken: AccessToken;
}

type LoginResponse = SogooResponse<LoginResponseData>;
