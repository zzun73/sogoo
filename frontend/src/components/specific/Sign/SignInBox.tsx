import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import sogoo from "../../../services/sogoo";
import useRootStore from "../../../stores";

const SignInBox = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { memberInfo, setLogin, setAccessToken } = useRootStore();

  const { mutate: handleLogin } = useMutation({
    mutationFn: sogoo.login,
    onSuccess: async (response) => {
      setLogin(response.data.userInfo);
      setAccessToken(response.headers.authorization.split(" ")[1]);
      console.log("로그인 성공:", response);
      alert("로그인 성공");
      console.log(memberInfo);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    },
  });

  const initiateLogin = (): void => {
    const loginForm: LoginForm = {
      email,
      password,
    };
    handleLogin(loginForm);
  };

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
      <Button
        variant="contained"
        sx={{ width: "95px", height: "42px" }}
        onClick={initiateLogin}
      >
        로그인
      </Button>
    </div>
  );
};

export default SignInBox;
