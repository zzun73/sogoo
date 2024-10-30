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

const SignUpBox = () => {
  const [name, setName] = useState<string>("");
  const [email, setEamil] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("buyer");
  const [businessNumber, setBusinessNumber] = useState<string>("");

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setBirth(date.format("YYYYMMDD"));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
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
      <TextField
        required
        id="signUpEmailInput"
        label="이메일"
        variant="outlined"
        onChange={(e) => setEamil(e.target.value)}
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
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
          <FormControlLabel value="buyer" control={<Radio />} label="소비자" />
          <FormControlLabel value="seller" control={<Radio />} label="판매자" />
        </RadioGroup>
      </FormControl>

      {role === "seller" && (
        <div className="w-full flex justify-between items-center mb-5">
          <TextField
            required
            id="signUpBusinessNumberInput"
            label="사업자 등록 번호"
            variant="outlined"
            onChange={(e) => setBusinessNumber(e.target.value)}
            sx={{ width: "80%", height: "50px" }}
          />
          <Button variant="outlined" sx={{ width: "17%", height: "42px" }}>
            확인
          </Button>
        </div>
      )}

      <Button variant="contained" sx={{ width: "95px", height: "42px" }}>
        가입하기
      </Button>
    </div>
  );
};

export default SignUpBox;
