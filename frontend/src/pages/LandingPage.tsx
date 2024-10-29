import CustomCarousel from "../components/common/Carousel";
// 정적 이미지
import Meat1 from "../assets/landingPage/meat1.jpg";
import Kimchi1 from "../assets/landingPage/kimchi1.jpg";

const LandingPage = () => {
  const carouselItems = [
    {
      id: 1,
      image: Meat1,
      title: "한판 떡갈비",
      description: "흰 쌀밥과 떡갈비 하나면 끼니 하나 뚝딱",
    },
    {
      id: 2,
      image: Kimchi1,
      title: "오마이 갓김치",
      description: "엄마가 갓 무쳐준 김치의 맛을 그대로 느껴보세요!",
    },
  ];

  return (
    <div>
      {/* Carousel 섹션 */}
      <section className="relative pb-20">
        <div className="w-full">
          <CustomCarousel items={carouselItems} autoplay={true} speed={500} autoplaySpeed={4000} />
        </div>
      </section>

      {/* 가족의 식단 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">가족의 식단을 더 풍요롭게</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">간편한 서브스크립션으로 바쁜 일상 속에서도 건강한 한 끼를 준비하세요.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/food1.jpg" alt="간편한 구독" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/food2.jpg" alt="맛있는 음식" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/food3.jpg" alt="다양한 메뉴" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 정기 배송 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/delivery.jpg" alt="정기배송 이미지" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold mb-6">정기적인 배송</h2>
            <p className="text-gray-600">매주 정기적으로 신선한 재료를 배송해 드립니다. 신선한 재료로 건강한 식사를 준비하세요.</p>
          </div>
        </div>
      </section>

      {/* 상생하는 가게 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 mt-8 md:mt-0 md:pr-12">
            <h2 className="text-3xl font-bold mb-6">상생하는 가게</h2>
            <p className="text-gray-600">가까운 동네상점에서, 고객과 점주님이 모두가 만족할 상생하는 플랫폼입니다.</p>
          </div>
          <div className="md:w-1/2">
            <img src="/store.jpg" alt="상생하는 가게 이미지" className="rounded-lg shadow-xl w-full h-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
