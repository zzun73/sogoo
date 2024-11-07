// components/Header.tsx
import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import useRootStore from "../../stores";
import { useNavigate } from "react-router-dom";
import sogoo from "../../services/sogoo";
import { useMutation } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();

  const store = useRootStore();
  const { setLogout } = useRootStore();
  const memberInfo = store.memberInfo;
  const isLogin = store.isLogin;
  const isSeller = store.memberInfo?.role === "SELLER";

  const { mutate: handleLogout } = useMutation({
    mutationFn: sogoo.logout,
    onSuccess: async (response) => {
      setLogout();
      console.log("로그아웃 성공", response);
      alert("로그아웃 완료");
      navigate("/sign");
    },
    onError: (error) => {
      console.log("로그아웃 실패", error);
      localStorage.clear();
      alert("로그아웃 실패");
    },
  });

  const initiateLogout = (): void => {
    handleLogout();
  };

  return (
    <>
      <header className="relative flex justify-center z-10">
        <div className="mt-10 mb-5">
          <Link to="/">
            <img src={LogoImg} alt="소상한 구독" className="w-[120px] drop-shadow-2xl" />
          </Link>
        </div>
      </header>
      <nav className="sticky top-0 py-1 text-2xl bg-black-paper text-white shadow-lg z-10">
        <div className="flex flex-row justify-between items-center w-full h-14 px-16">
          {/* 페이지 이동 */}
          <div className="flex items-center gap-8">
            <Link to="/" className="font-chosun">
              홈
            </Link>
            <Link to="/store" className="font-chosun">
              매장 조회
            </Link>
          </div>
          {/* user 관련 */}
          <div className="flex items-center gap-8">
            {memberInfo && (
              <div className="font-chosun text-xl">
                [{isSeller ? "판매자" : "고객"}] {memberInfo.name} 님
              </div>
            )}
            {isLogin && (
              <Link to={isSeller ? "/seller" : "/mypage"}>
                <MdOutlinePerson className="w-6 h-6" />
              </Link>
            )}
            {isLogin && !isSeller && (
              <Link to="/orders/cart">
                <MdOutlineShoppingCart className="w-6 h-6" />
              </Link>
            )}
            {isLogin ? (
              <button className="font-chosun" onClick={initiateLogout}>
                로그아웃
              </button>
            ) : (
              <Link to="/sign" className="font-chosun">
                로그인/회원가입
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
