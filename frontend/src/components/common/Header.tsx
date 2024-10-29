import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="flex flex-col items-center shadow-md">
      <div className="my-10">
        <img className="w-[100px]" src={LogoImg} alt="소상한 구독" />
      </div>
      <nav className="flex flex-row justify-between w-full h-10 px-16">
        {/* 페이지 이동 */}
        <div className="flex gap-8">
          <Link to="/">홈</Link>
          <Link to="/store">매장 조회</Link>
        </div>
        {/* user 관련 */}
        <div className="flex gap-8">
          <Link to="/mypage">마이페이지</Link>
          <Link to="/cart">장바구니</Link>
          <Link to="/auth">로그인/회원가입</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
