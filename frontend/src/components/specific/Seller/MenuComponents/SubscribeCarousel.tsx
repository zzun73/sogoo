import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SubscribeCarouselData {
  subscribeProducts: SubscribeProductsData[];
}

const SubscribeCarousel: React.FC<SubscribeCarouselData> = ({
  subscribeProducts,
}) => {
  const items = subscribeProducts?.sort(
    (a, b) => a.subscribeRound - b.subscribeRound
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 400,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full bg-main-200 mb-10 flex justify-center items-center rounded-lg">
      <Slider className="w-11/12" {...settings}>
        {items?.map((item: SubscribeProductsData) => {
          return (
            <div className="w-full flex flex-col justify-center items-center p-5">
              <div className="text-xl font-bold mb-5">
                {item.subscribeRound}주차 메뉴 ({item.subscribeDate} ~ )
              </div>
              <div className="w-full h-96 flex flex-col justify-evenly items-center bg-white rounded-lg px-4">
                {item?.foodData.map((food: SubscribeFoodItem) => {
                  return (
                    <div className="w-full h-24 flex items-center border-2 border-slate-300 rounded px-3">
                      <div className="w-[90px] h-[90px] flex justify-center items-center">
                        <img
                          className="max-h-[85px]"
                          src={food.foodImg}
                          alt={`${food.foodName} 이미지`}
                        />
                      </div>
                      <div className="w-full ms-5">
                        <h1 className="text-lg font-bold">{food.foodName}</h1>
                        <p className="text-base">{food.foodDescription}</p>
                      </div>
                      <h1 className="text-lg font-bold">{food.foodPrice}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SubscribeCarousel;
