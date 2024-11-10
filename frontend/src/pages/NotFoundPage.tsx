import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-main-200 flex flex-col items-center justify-center">
      {/* 수묵화 스타일의 404 메시지 */}
      <div
        className="text-[200px] leading-none font-bold text-gray-800 mb-8 transform hover:scale-105 transition-transform duration-300"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        無
      </div>

      {/* 먹의 번짐 효과를 주는 장식 요소 */}
      <div className="relative w-96 h-1 bg-gray-800 mb-12">
        <div className="absolute -top-1 -left-3 w-[400px] h-3 bg-gray-800 opacity-10 blur-lg"></div>
      </div>

      {/* 한문 스타일의 에러 메시지 */}
      <h1 className="text-4xl mb-6 text-gray-700 font-shilla">찾으시는 길이 없습니다</h1>

      {/* 부연 설명 */}
      <p className="text-xl text-gray-600 mb-12 text-center w-[600px] leading-relaxed font-chosun">
        구독의 길은 때로는 멀고도 험할 수 있습니다.
        <br />
        그러나 바른 길로 인도하는 것이 저희의 소임이옵니다.
      </p>

      {/* 도장 스타일의 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="bg-point-600 text-white px-12 py-6 rounded-lg
                   transition-colors duration-300 shadow-lg transform hover:bg-point-800 hover:scale-105"
      >
        <span className="block text-2xl font-medium">歸家</span>
        <span className="block text-lg mt-1">집으로 돌아가기</span>
      </button>
    </div>
  );
};

export default NotFoundPage;
