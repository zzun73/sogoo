import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const SignUpBox = () => {
  const [role, setRole] = useState<string>("buyer");

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TextField
        id="signUpNameInput"
        label="이름"
        variant="outlined"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpEmailInput"
        label="이메일"
        variant="outlined"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpPasswordInput1"
        label="비밀번호"
        variant="outlined"
        type="password"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpPasswordInput2"
        label="비밀번호 확인"
        variant="outlined"
        type="password"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpAddressInput"
        label="주소"
        variant="outlined"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpBirthInput"
        label="생년월일"
        variant="outlined"
        sx={{ width: "100%", height: "50px", marginBottom: "20px" }}
      />
      <TextField
        id="signUpPhoneInput"
        label="연락처(휴대전화 번호)"
        variant="outlined"
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
            id="signUpBusinessNumberInput"
            label="사업자 등록 번호"
            variant="outlined"
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
