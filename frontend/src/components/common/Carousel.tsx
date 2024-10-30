import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description?: string;
}

interface CustomCarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  speed?: number;
  autoplaySpeed?: number;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ items, autoplay = true, speed = 500, autoplaySpeed = 4000 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="relative h-[600px]">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            {item.description && (
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p>{item.description}</p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomCarousel;
