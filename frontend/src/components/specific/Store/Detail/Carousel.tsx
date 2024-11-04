import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "@mui/material";
import SubscribeSlider from "./SubscribeSlider";

interface FoodProps {
  foodId: number;
  foodName: string;
  foodDescription: string;
  foodImg: string;
}

interface WeeklyFood {
  subscribeDate: string;
  subscribeRound: number;
  foods: FoodProps[];
}

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
  };

  return (
    <div className="w-[850px] mx-auto">
      <Card className="m-5 h-80">
        <Slider {...settings}>
          {weeklyFood.map((item: WeeklyFood) => (
            <SubscribeSlider key={`${item.subscribeRound}주차`} week={item} />
          ))}
        </Slider>
      </Card>
    </div>
  );
};

export default Carousel;
