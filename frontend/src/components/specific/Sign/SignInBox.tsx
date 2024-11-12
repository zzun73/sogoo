import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import sogoo from "../../../services/sogoo";
import useRootStore from "../../../stores";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignInBox = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setLogin, setAccessToken } = useRootStore();

  const { mutate: handleLogin } = useMutation({
    mutationFn: sogoo.login,
    onSuccess: async (response) => {
      setLogin(response.data.userInfo);
      setAccessToken(response.headers.authorization.split(" ")[1]);
      console.log(response.data.userInfo.name);
      navigate("/");
      toast(`${response.data.userInfo.name}님, 반갑습니다!`);
    },
    onError: (error) => {
      console.error("로그인 실패", error);
      toast.error("로그인 실패!");
    },
  });

  const initiateLogin = (): void => {
    switch (true) {
      case !email: {
        toast.error("이메일을 입력해주세요.");
        return;
      }
      case !password: {
        toast.error("비밀번호를 입력해주세요.");
        return;
      }
      default: {
        const loginForm: LoginForm = {
          email,
          password,
        };
        handleLogin(loginForm);
      }
    }
  };

  const handleLoginKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      initiateLogin();
    }
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
        onKeyDown={handleLoginKeydown}
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
