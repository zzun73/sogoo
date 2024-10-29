import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignInBox = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <TextField
        id="signInEmailInput"
        label="이메일"
        variant="outlined"
        sx={{ width: "100%", height: "56px", marginBottom: "40px" }}
      />
      <TextField
        id="signInPasswordInput"
        label="비밀번호"
        variant="outlined"
        type="password"
        sx={{ width: "100%", height: "56px", marginBottom: "40px" }}
      />
      <Button variant="contained" sx={{ width: "95px", height: "42px" }}>
        로그인
      </Button>
    </div>
  );
};

export default SignInBox;
