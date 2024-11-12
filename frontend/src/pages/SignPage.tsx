import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import SignInBox from "../components/specific/Sign/SignInBox";
import SignUpBox from "../components/specific/Sign/SignUpBox";
import BrushBorder from "../components/common/BrushBorder";

const SignPage = () => {
  const navigate = useNavigate();
  const [clickedLogin, setClickedLogin] = useState<boolean>(true);

  const goToLanding = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <BrushBorder className="h-full max-h-[500px] flex items-center pr-20" borderColor="#333333" strokeWidth={4}>
        <img className="w-60 mb-10 cursor-pointer transform duration-300 hover:scale-[1.05]" src={LogoImg} alt="소상한 구독" onClick={goToLanding} />
      </BrushBorder>

      <div className="w-20"></div>
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
