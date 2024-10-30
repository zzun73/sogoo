import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignInBox = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TextField
        required
        id="signInEmailInput"
        label="이메일"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: "100%", height: "56px", marginBottom: "40px" }}
      />
      <TextField
        required
        id="signInPasswordInput"
        label="비밀번호"
        variant="outlined"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: "100%", height: "56px", marginBottom: "40px" }}
      />
      <Button variant="contained" sx={{ width: "95px", height: "42px" }}>
        로그인
      </Button>
    </div>
  );
};

export default SignInBox;
