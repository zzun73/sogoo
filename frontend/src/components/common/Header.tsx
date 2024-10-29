import { Link } from "react-router-dom";
import LogoImg from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="flex flex-col items-center">
      <div className="my-10">
        <img className="w-[100px]" src={LogoImg} alt="소상한 구독" />
      </div>
      <nav>
        <Link to="/">홈</Link>
      </nav>
    </header>
  );
};

export default Header;
