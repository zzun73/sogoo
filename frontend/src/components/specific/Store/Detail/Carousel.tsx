import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubscribeSlider from "./SubscribeSlider";

interface WeeklyProps {
  weeklyFood: WeeklyFood[];
}

const Carousel = ({ weeklyFood }: WeeklyProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: number[]) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={{
          margin: "5px",
          fontSize: "15px",
          color: "gray",
          borderRadius: "50%",
        }}
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="w-[850px] mx-auto">
      <hr />
      <div className="m-5 pb-8 px-10">
        <Slider {...settings}>
          {weeklyFood.map((item: WeeklyFood) => (
            <SubscribeSlider key={`${item.subscribeRound}주차`} week={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
