import { useState } from "react";
import LogoImg from "../../assets/logo.png";
import SignInBox from "./SignInBox";
import SignUpBox from "./SignUpBox";

const SignPage = () => {
  const [clickedLogin, setClickedLogin] = useState<boolean>(true);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img className="w-40 mb-10" src={LogoImg} alt="소상한 구독" />
      <div className="w-[450px] flex flex-col items-center">
        <div className="flex w-full justify-center mb-10">
          <div
            onClick={() => setClickedLogin(true)}
            className={`w-1/2 h-10 border-2 rounded flex justify-center items-center ${
              clickedLogin ? "border-blue-500" : "border-inherit"
            } cursor-pointer`}
          >
            로그인
          </div>
          <div
            onClick={() => setClickedLogin(false)}
            className={`w-1/2 h-10 border-2 rounded flex justify-center items-center ${
              !clickedLogin ? "border-blue-500" : "border-inherit"
            } cursor-pointer`}
          >
            회원가입
          </div>
        </div>

        {clickedLogin ? <SignInBox /> : <SignUpBox />}
      </div>
    </div>
  );
};

export default SignPage;
