import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useCheckEmail, useCheckSeller } from "../../../queries/queries";
import { useMutation } from "@tanstack/react-query";
import sogoo from "../../../services/sogoo";
import { useNavigate } from "react-router-dom";
import useRootStore from "../../../stores";

const SignUpBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("Buyer");
  const [businessNumber, setBusinessNumber] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isSellerValid, setIsSellerValid] = useState<boolean | null>(null);

  const { setLogin, setAccessToken } = useRootStore();
  const { refetch } = useCheckEmail(email);
  const { refetch: refetchSeller } = useCheckSeller(businessNumber);

  const { mutate: handleSignUp } = useMutation({
    mutationFn: sogoo.signup,
    onSuccess: async (response) => {
      console.log("회원가입 성공:", response);
      alert("회원가입 성공");

      const loginResponse = await sogoo.login({ email, password: password1 });
      setLogin(loginResponse.data.userInfo);
      setAccessToken(loginResponse.headers.authorization.split(" ")[1]);
      console.log("자동 로그인 성공:", loginResponse);

      navigate("/");
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패");
    },
  });

  const initiateSignUp = (): void => {
    switch (true) {
      case !name: {
        alert("이름을 입력하세요.");
        return;
      }
      case !email: {
        alert("이메일을 입력하세요.");
        return;
      }
      case !password1: {
        alert("비밀번호를 입력하세요.");
        return;
      }
      case password1 !== password2: {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      case !address: {
        alert("주소를 입력하세요.");
        return;
      }
      case !birth: {
        alert("생년월일을 입력하세요.");
        return;
      }
      case !phone: {
        alert("연락처를 입력하세요.");
        return;
      }
      case isEmailValid === null: {
        alert("이메일 검사를 실행해주세요.");
        return;
      }
      case isEmailValid === false: {
        alert("사용 중인 이메일로는 가입하실 수 없습니다.");
        return;
      }
      case role === "Seller" && !businessNumber: {
        alert("사업자 회원가입을 위해서는 사업자 등록 번호가 필요합니다.");
        return;
      }
      case role === "Seller" && isSellerValid === null: {
        alert("사업자 번호 검사를 실행해주세요.");
        return;
      }
      case role === "Seller" && isSellerValid === false: {
        alert("유효한 사업자 번호를 입력해주세요.");
        return;
      }
      default: {
        const signUpForm: SignUpForm = {
          name,
          email,
          password: password1,
          phoneNumber: phone,
          birth,
          address,
          role,
          businessNumber: role === "Seller" ? businessNumber : null,
        };
        handleSignUp(signUpForm);
      }
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setBirth(date.format("YYYYMMDD"));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleEmailCheck = async () => {
    const result = await refetch();
    console.log(result);
    setIsEmailValid(String(result.data?.data) === "사용 가능한 이메일핑");
  };

  const handleEmailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleEmailCheck();
    }
  };

  const handleSellerCheck = async () => {
    const result = await refetchSeller();
    console.log(result);
    setIsSellerValid(String(result.data?.data) === "사업자 인증 완료핑");
  };

  const handleSellerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSellerCheck();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TextField
        required
        id="signUpNameInput"
        label="이름"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <div className="w-full flex justify-between items-center mb-5">
        <TextField
          required
          id="signUpEmailInput"
          label="이메일"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEmailKeyDown}
          sx={{ width: "80%", height: "50px" }}
        />
        <Button
          variant="outlined"
          sx={{ width: "17%", height: "42px" }}
          onClick={handleEmailCheck}
        >
          확인
        </Button>
      </div>
      {isEmailValid === true && (
        <p className="text-green-500 mb-3">사용 가능한 이메일입니다.</p>
      )}
      {isEmailValid === false && (
        <p className="text-red-500 mb-3">이 이메일은 이미 사용 중입니다.</p>
      )}
      <TextField
        required
        id="signUpPasswordInput1"
        label="비밀번호"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword1(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        required
        id="signUpPasswordInput2"
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword2(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        required
        id="signUpAddressInput"
        label="주소"
        variant="outlined"
        onChange={(e) => setAddress(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="생년월일"
          onChange={handleDateChange}
          sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
        />
      </LocalizationProvider>
      <TextField
        required
        id="signUpPhoneInput"
        label="연락처(휴대전화 번호)"
        variant="outlined"
        placeholder="ex. 01012341234"
        onChange={(e) => setPhone(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={role}
          onChange={handleRoleChange}
          sx={{ marginBottom: "20px" }}
        >
          <FormControlLabel value="Buyer" control={<Radio />} label="소비자" />
          <FormControlLabel value="Seller" control={<Radio />} label="판매자" />
        </RadioGroup>
      </FormControl>

      {role === "Seller" && (
        <>
          <div className="w-full flex justify-between items-center mb-5">
            <TextField
              required
              id="signUpBusinessNumberInput"
              label="사업자 등록 번호"
              variant="outlined"
              onChange={(e) => setBusinessNumber(e.target.value)}
              onKeyDown={handleSellerKeyDown}
              sx={{ width: "80%", height: "50px" }}
            />
            <Button
              variant="outlined"
              sx={{ width: "17%", height: "42px" }}
              onClick={handleSellerCheck}
            >
              확인
            </Button>
          </div>
          {isSellerValid === true && (
            <p className="text-green-500 mb-3">
              사업자 번호 인증에 성공하셨습니다.
            </p>
          )}
          {isSellerValid === false && (
            <p className="text-red-500 mb-3">
              해당 번호의 사업자를 찾지 못했습니다.
            </p>
          )}
        </>
      )}

      <Button
        variant="contained"
        sx={{ width: "95px", height: "42px" }}
        onClick={initiateSignUp}
      >
        가입하기
      </Button>
    </div>
  );
};

export default SignUpBox;
